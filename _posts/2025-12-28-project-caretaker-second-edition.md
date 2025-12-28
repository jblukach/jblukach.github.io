---
layout: post
title: "Builder #2 - Project Caretaker, Second Edition"
author: "John Lukach"
tags: asn dns geo ipv4 ipv6 osint reputation
---

The first public release of [Project Caretaker](https://github.com/jblukach/caretaker) was released on **August 25th, 2023**, to monitor the Internet reputation for the state of North Dakota in the United States.

- [4n6ir #28 - Internet Reputation Monitoring](https://blog.lukach.io/2023/11/24/internet-reputation-monitoring.html)

It worked well for the original scope, but I needed a way to verify reputation for specific IPv4 and IPv6 addresses globally. Over the last two-plus years, there has been significant turnover among Open Source Intelligence (OSINT) feeds, with some stopping operations or moving behind a paywall. Sadly, not enough new feeds have come online to replace the ones we have lost.

[Censys](https://www.censys.com) [Search](https://search.censys.io) has gone legacy with the release of the Unified Platform, leaving questions about their Security Researcher program, in which I had been participating. It was a good time to reduce the number of external dependencies for [Project Caretaker](https://github.com/jblukach/caretaker) to just the [MaxMind GeoLite2](https://www.maxmind.com) enrichment.

I also chose to remove the active DNS inspection for email security on MX, SPF, and DMARC records, focusing on IPv4 and IPv6 at scale. Of course, I still collect domain names from OSINT feeds where available.

- [Introducing guidelines for network scanning](https://aws.amazon.com/blogs/security/introducing-guidelines-for-network-scanning/)

On **April 28th, 2025**, I started down the path of continuing to provide Internet reputation verification while improving sustainability, requiring infrastructure improvements included in the new [Minimum Viable Landing Zone (MVLZ)](https://blog.lukach.io/2025/12/26/minimum-viable-landing-zone.html).

### Second Edition

First, I standardized the threat feed downloads into CSV files, which are also compressed, for future research into a data lake. The download frequency can be increased with an EventBridge Rule change if **11:00 AM UTC** daily is not acceptable without any code changes.

Second, I consolidate all the threat feed data into a single, deduplicated file that maintains attribution to specific threat feeds.

Third, I enrich IPv4 and IPv6 addresses with [MaxMind GeoLite2](https://www.maxmind.com) data, including ASN, Country, and State information. The addresses and domains are loaded into SQLite databases and distributed to USE1 and USW2 for high availability.

Fourth, publicly available API endpoints are updated daily for ASN, CO, DNS, IP, and ST, providing multiple options for consuming the atomic indicators.

### Visit Website

[Project Caretaker](https://github.com/jblukach/caretaker) makes this easy. It offers a simple, transparent way for anyone to check and verify their Internet reputation, just by visiting a website.

[https://api.lukach.io/osint/ip](https://api.lukach.io/osint/ip)

### Unknown

An unknown result indicates that no data is currently available from the threat feeds, which does **not** guarantee that the IP is safe; it simply shows there is no evidence at this time linking it to malicious activity.

```json
{
    "ip": " IPv4 or IPv6 ",
    "status": "unknown",
    "updated": "2025-12-28 11:10:15 UTC",
    "region": "us-east-1"
}
```

### Suspect

A suspect result indicates that one or more threat feeds have flagged the IP address as suspicious. The system will list the specific feeds, allowing for further investigation or remediation.

```json
{
    "ip": " IPv4 or IPv6 ",
    "status": "suspect",
    "attribution": [
        [
            " IPv4 or IPv6 ",
            "jamesbrine",
            "https://jamesbrine.com.au"
        ]
    ],
    "updated": "2025-12-28 11:10:15 UTC",
    "region": "us-east-1"
}
```

Now, as I spin up Amazon Web Services (AWS) resources, I can quickly check the reputation of the assigned public address with [Project Caretaker](https://github.com/jblukach/caretaker).
