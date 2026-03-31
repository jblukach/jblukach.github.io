---
layout: post
title: "Builder #3 - Second-Level Domain Monitoring"
author: "John Lukach"
tags: domain expired intel monitor new osint threat
---

The second-level domain (SLD) is the unique part of a domain name that appears directly to the left of the top-level domain (TLD). These phrases, symbols, or words represent an individual or organization’s Internet brand. Fraudsters can use domains with the SLD to launch phishing attacks. Competitors can use domain names with the SLD to influence customers. Others can use domain names with the SLD that impede on your brand. You might even forget to renew a critical domain. 

Amazon Cognito Plus does not support multi-region deployments, but it costs only $0.02 per monthly active user (MAU) to duplicate accounts across regions, since passwordless authentication does not require replication. Route53 failover determines which region has the active User Pool, with USE1 or USW2 pinned due to CloudFormation limitations on custom domains and app client credentials.

[https://github.com/jblukach/cognito](https://github.com/jblukach/cognito)

Lunker WebUI uses DynamoDB Global Tables with Secondary Indexes to provide a highly available, multi-region user experience that triggers data processing in USE2 via DynamoDB Streams for ad-hoc searches.

[https://github.com/jblukach/lunker](https://github.com/jblukach/lunker)

New and expired domain registration lists are downloaded daily at 1 AM UTC, and the service costs $9 per month or $89 per year. At 1:15 AM UTC, the Lambda functions build SQLite databases for improved search performance.

[https://domains-monitor.com](https://domains-monitor.com)

At 11:15 AM UTC, searches run against the SQLite databases with state maintained in DynamoDB Global Tables as items get added and/or removed, which the Lunker WebUI reads. The full list of domains remains compressed as a ZIP file, allowing searches within the constraints of a Lambda function.

[https://github.com/jblukach/webmonitor](https://github.com/jblukach/webmonitor)

I delayed the searches to include Open Source Intelligence (OSINT) collected by the Project Caretaker project, alongside the malware list from the Domains Monitor subscription, to identify suspect domains.

[https://github.com/jblukach/caretaker](https://github.com/jblukach/caretaker)

When a domain is first inserted as a suspect, expired, or newly registered domain, an SES email alert notifies users in the Lunker WebUI whose SLD matches the domain.

Build vs. Buy, how about a combination of both to solve a common problem!
