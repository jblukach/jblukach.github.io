---
layout: post
title: "4n6ir #37 - Open Ports, Reputation Monitoring & Web Inspection"
author: "John Lukach"
tags: aws censys chatops exposure guardduty lunker macie osint ports reputation surface threat webrecorder
---

Lunker Zero, a.k.a. LZ, performs Threat Surface monitoring with ChatOps to detect Internet-accessible network risk and Open Source Intelligence reputation. 

[https://github.com/jblukach/lunkerzero](https://github.com/jblukach/lunkerzero)

**COMPONENTS**

Censys Search determines when ports are opened/closed based on the Autonomous System (AS) number query results, which provides third-party validation.

[https://search.censys.io](https://search.censys.io)

Open Source Threat Intelligence consolidated by the CloudCruft project compares against the Lunker Zero database for matching DNS, IPv4, and IPv6 atomic indicators.

[https://github.com/jblukach/cloudcruft](https://github.com/jblukach/cloudcruft)

Webrecorder project archives websites for analysis using Amazon GuardDuty & Macie for malicious and sensitive content inspection.

[https://github.com/webrecorder](https://github.com/webrecorder)

**SCENARIOS**

1. Ports accidentally being opened to the Internet is an age-old problem. This results in regular firewall reviews or, worse, having the port identified with a discovered vulnerability, raising the risk to the organization. Increasing complexity, continuous deployments, and chances of misconfigurations have increased the need for third-party validation.

2. Reputation monitoring has become critical to organizations of all sizes as it can directly impact the business bottom line when customers cannot use what they are paying to consume. It can also indicate a more significant problem when company resources appear on Open Source Threat Intelligence lists.

3. Detections are good, but with today's ephemeral systems, the need for evidence collection has increased to improve the odds of successful investigations. The volume of data and logs requiring review has driven the need for automation to a requirement, especially for the low-hanging fruit of malicious and sensitive content.

It has been nice to save some time with repetitive tasks by moving open ports and reputation monitoring to an hourly ChatOps function. Plus, I added a new capability to my toolkit for website inspection for a fun project!
