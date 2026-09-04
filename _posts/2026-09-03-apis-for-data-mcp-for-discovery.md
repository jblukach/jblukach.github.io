---
layout: post
title: "Builder #2 - APIs for Data, MCP for Discovery"
author: "John Lukach"
tags: aws api mcp strategy
---

Model Context Protocol (MCP) has quickly become the standard for giving AI agents access to external tools. But after building production systems with it, I ran into a practical bottleneck: forcing every high-volume data request through an MCP tool wrapper creates unnecessary overhead.

When an AI agent needs to geolocate a batch of 300 IP addresses, wrapping each request in an MCP tool payload adds protocol translation, SSE streaming transport management, and client-side tool binding dependencies. Standard HTTP REST endpoints and direct Lambda invocations already handle high throughput, low latency, rate limiting, and multi-region failover cleanly.

That realization led to a core rule for my infrastructure: **APIs handle the data plane, while MCP handles the control plane.**

Instead of building heavy MCP microservices, I split the architecture across three repositories:

- [jblukach/api](https://github.com/jblukach/api) — Multi-region API Gateway ingress and Route 53 DNS failover.
- [jblukach/geo](https://github.com/jblukach/geo) — High-speed IP intelligence engine backed by MaxMind GeoLite2.
- [jblukach/mcp](https://github.com/jblukach/mcp) — Serverless MCP server for endpoint discovery and agent instruction.

```text
           +---------------------------+
           |      AI Agent Runtime     |
           +---------------------------+
              |                     |
     1. Discovery              2. Direct Execution
        (control plane)          (data plane)
              |                     |
              v                     v
  +--------------------+   +--------------------+
  |   jblukach/mcp     |   |   jblukach/api     |
  |  Discovery Service |   |  Regional Ingress  |
  |  FastMCP / Mangum  |   |  HTTP API Gateway  |
  +--------------------+   +--------------------+
              |                     |
              | fallback            | proxies raw HTTP
              | tool proxy          v
              |            +--------------------+
              +----------->|   jblukach/geo     |
                           |  Geo Intelligence  |
                           |   Python / MMDB    |
                           +--------------------+
```

## The Pattern: Teach the Agent, Don't Proxy the Payload

Most MCP implementations treat the protocol as a heavy proxy where every data request travels through a tool call. I flipped that sequence:

1. **Discovery**: The agent queries the MCP server (or a plain HTTP discovery URL) to see what endpoints exist.
2. **Instruction Blueprint**: The MCP server returns a JSON blueprint containing the target URL, HTTP method, required headers, JSON schema, rate limits, regional failover rules, and explicit instructions.
3. **Direct Execution**: The agent calls the public API Gateway directly using its own HTTP client (`curl`, `fetch`, or Python `requests`) — bypassing the MCP layer for raw data transfers.

If an agent runs in a locked-down environment without direct network access, the MCP server still exposes a fallback `geo_lookup` tool proxy. But direct HTTP execution is the primary path.

## 1. Global Ingress: `jblukach/api`

The `api` repository provisions the public front door at `api.lukach.io`. It is built with AWS CDK in Python and deployed across three regions: `us-east-1`, `us-east-2`, and `us-west-2`.

### Multi-Region Routing & DNS Failover

The apex domain `api.lukach.io` sits on Route 53 health-check failover. `us-east-1` (`use1.api.lukach.io`) is the primary region, monitored every 30 seconds at `/health`. If `us-east-1` fails 3 consecutive health checks, Route 53 shifts apex traffic to `us-west-2` (`usw2.api.lukach.io`). `us-east-2` (`use2.api.lukach.io`) operates as an independent regional endpoint.

To avoid circular dependencies across stacks, `ApiUse1` in `us-east-1` creates the Route 53 hosted zone and writes the hosted zone ID to SSM parameter `/route53/apilukachio`. Stacks in `us-east-2` (`ApiUse2`) and `us-west-2` (`ApiUsw2`) use custom resources to read this parameter at deploy time and register regional `A` and `AAAA` alias records.

### HTTP API Gateway Setup

Regional HTTP APIs use Payload Format 2.0. This passes full request context, including `$context.identity.sourceIp`, allowing the backend lookup function to automatically geolocate callers hitting `GET /geo` without requiring explicit query parameters.

All regional endpoints support dual-stack IPv4/IPv6 target aliases. CORS preflight handles `DELETE`, `GET`, `POST`, and `OPTIONS`, explicitly allowing MCP headers (`mcp-protocol-version`, `mcp-session-id`, `accept`, `content-type`).

Lambda targets (`search` and `mcp-service`) are imported across stacks using SSM parameter lookups (`/account/geo` and `/account/mcp`) with `skip_permissions=True`. Regional stacks export `geosourcearn` and `mcpsourcearn` CloudFormation outputs so target accounts can scope `apigateway.amazonaws.com` invoke permissions. `ApiStack` in `us-east-2` configures an OpenID Connect (OIDC) provider for GitHub Actions (`repo:jblukach/api:*`) to run keyless deployments.

## 2. IP Intelligence Engine: `jblukach/geo`

The `geo` repository enriches IPv4 and IPv6 addresses with ASN ownership and MaxMind GeoLite2 location data.

### Automated Database Updates

MaxMind updates database files frequently. To keep data current without manual updates or service downtime:
1. A CDK trigger stack (`GeoDownload`) runs on a schedule, authenticating against MaxMind to inspect database headers.
2. When an update is published, it downloads `GeoLite2-ASN.mmdb` and `GeoLite2-City.mmdb`, verifies their SHA-256 digests, packages them into a Lambda layer (`maxminddb.zip`), and writes them to S3 staging buckets (`geo-staged-*-lukach-io`).
3. The function issues an asynchronous `update_function_code` API call to update the `search` Lambda in `us-east-1`, `us-east-2`, and `us-west-2` simultaneously.

### Execution Guardrails & Memory Optimizations

The lookup function runs on Python 3.13 on ARM64 Graviton with 256 MB memory and a 30-second timeout. Reads execute against MaxMind binary files in memory. If a batch contains duplicate valid IPs, the handler deduplicates file reads while maintaining input order and duplicate entries in the JSON response.

To prevent Lambda timeouts, the engine enforces strict limits:
- Maximum 300 IPs per request (`MAX_IPS_PER_REQUEST`).
- Maximum 256 KiB request payload (`MAX_REQUEST_BODY_BYTES`).
- **Processing Budget Check**: Before resolving each IP, the function checks `context.get_remaining_time_in_millis()`. If remaining execution time drops below `MIN_REMAINING_TIME_MS` (default 1500ms), it returns an HTTP `503` asking the caller to reduce batch size rather than letting the Lambda time out hard.

The function supports multiple access paths:
- **HTTP REST**: `GET /geo` (source IP lookup), `GET /geo/{ip}`, `GET /geo?ip=1.1.1.1,8.8.8.8`, or `POST /geo` with `{"ips": [...]}`.
- **Direct Lambda Invocation**: Internal AWS workloads invoke `search` directly via `boto3` with payload `{"ips": [...]}`, skipping API Gateway.
- **Embedded MCP**: Contains an inline JSON-RPC parser for `geo_lookup` tool calls.

## 3. Discovery & Instruction Service: `jblukach/mcp`

The `mcp` repository deploys a serverless MCP server using FastMCP and Mangum, running Python 3.13 on ARM64 with stateless HTTP transport (`stateless_http=True`).

### Dual Protocol Access
- **MCP JSON-RPC**: Handles `/mcp` requests containing header `Accept: application/json, text/event-stream`. Supports protocol version `2025-06-18` (`initialize`, `notifications/initialized`, `tools/list`, and `tools/call`).
- **Plain HTTP Discovery**: Non-MCP clients, web browsers, and `curl` scripts can send a plain `GET /mcp` to list endpoints, or `GET /mcp?endpoint=geo` to inspect instruction blueprints without needing an MCP client library.

### Serverless Tools
- `list_available_endpoints()`: Returns a JSON array of registered endpoints (`["geo"]`).
- `get_api_instructions(endpoint_name)`: Returns a structured blueprint with failover URLs (`https://api.lukach.io/geo`), regional endpoints (`use1`, `use2`, `usw2`), payload JSON Schema, curl examples, limits, and explicit agent prompts.
- `geo_lookup(ip, ips)`: A tool proxy forwarding requests to `https://api.lukach.io/geo` using Python's standard `urllib.request`.

## How an Agent Interacts with the System

When an AI agent needs to process IP geolocation data, it goes through three simple steps:

### 1. Discover Available Endpoints
The agent probes the discovery endpoint:

```bash
curl https://api.lukach.io/mcp
```

```json
{
  "service": "mcp-discovery-instruction-service",
  "status": "ok",
  "available_endpoints": ["geo"],
  "tools": {
    "list_available_endpoints": {
      "http_example": "GET /mcp"
    },
    "get_api_instructions": {
      "http_examples": ["GET /mcp?endpoint=geo"]
    }
  }
}
```

### 2. Read Endpoint Blueprint & Agent Instructions
The agent requests instructions for `geo`:

```bash
curl "https://api.lukach.io/mcp?endpoint=geo"
```

```json
{
  "endpoint": "https://api.lukach.io/geo",
  "endpoints": {
    "failover": {
      "url": "https://api.lukach.io/geo",
      "primary_region": "us-east-1",
      "secondary_region": "us-west-2"
    },
    "regional": {
      "us-east-1": "https://use1.api.lukach.io/geo",
      "us-east-2": "https://use2.api.lukach.io/geo",
      "us-west-2": "https://usw2.api.lukach.io/geo"
    }
  },
  "method": "POST",
  "supported_http_methods": ["GET", "POST"],
  "headers": {
    "Content-Type": "application/json"
  },
  "payload_schema": {
    "type": "object",
    "properties": {
      "ips": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "minItems": 1,
        "maxItems": 300
      }
    }
  },
  "agent_instructions": "You are an AI agent with network capabilities. Invoke the public geo API directly from your environment; do not ask the user to make the call. Use https://api.lukach.io for normal public traffic..."
}
```

### 3. Execute Direct API Calls
With the schema, endpoints, and limits in hand, the agent issues raw HTTP requests directly:

```bash
curl -X POST https://api.lukach.io/geo \
  -H "Content-Type: application/json" \
  -d '{"ips":["1.1.1.1","8.8.8.8"]}'
```

## Deployment Sequence

To deploy this environment from scratch:

1. **Deploy Ingress Role (`jblukach/api`)**: Deploy `ApiStack` in `us-east-2` for GitHub Actions OIDC role creation.
2. **Deploy Geo Infrastructure (`jblukach/geo`)**:
   - Deploy `GeoSearchUSE1`, `GeoSearchUSE2`, and `GeoSearchUSW2`.
   - Configure MaxMind credentials in Secrets Manager (`geo`).
   - Deploy `GeoDownload` in `us-east-2` to sync database layers.
3. **Deploy MCP Discovery (`jblukach/mcp`)**: Deploy `McpStackUSE1`, `McpStack`, and `McpStackUSW2`.
4. **Deploy Regional Ingress (`jblukach/api`)**:
   - Set `/account/geo` and `/account/mcp` SSM parameters with target account IDs.
   - Deploy `ApiUse1` (creates Route 53 zone), then deploy `ApiUse2` and `ApiUsw2`.
5. **Verify Failover**: Monitor `/health` endpoints and test DNS failover behavior when `us-east-1` health checks fail.

## Key Takeaways

Using APIs for data transfer and MCP for control plane discovery provides clear operational advantages:
- **Low Latency & High Throughput**: Data payloads move directly over HTTP/2 or AWS SDK Lambda invocations without MCP framing overhead.
- **Self-Describing Workloads**: AI agents dynamically inspect endpoints, discover JSON schemas, and learn failover routes on demand.
- **Multi-Region Resiliency**: Route 53 health checks ensure public traffic fails over cleanly across regions if an outage occurs.
