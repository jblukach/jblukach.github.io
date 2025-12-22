---
layout: post
title: "4n6ir #49 - Security Control Latency Measurement"
author: "John Lukach"
tags: aws ipv4 ipv6 https latency
---

Amazon Web Services (AWS) announced the addition of a new Availability Zone for the US East (Northern Virginia) Region, but it is in Maryland. I do not remember ever seeing the details that all Availability Zones must be within sixty miles of each other to support synchronous replication sufficiently. In a distributed world, having resources close to the last-mile delivery improves the user experience. 

Adding security controls into the mix could create a negative user experience, requiring a method to test the potential impact and a technique to determine when to expand to a closer region to support the customer.

### Lag Infrastructure

On March 31st, 2025, the API Gateways finally received dual-stack endpoint support for IPv6, simplifying the required infrastructure.

[https://github.com/jblukach/lag](https://github.com/jblukach/lag)

First, I set up HTTP API Gateways in all available regions to measure latency from the source system for development and production environments.

```
*.dev.4n6ir.com
```

```
*.lag.4n6ir.com
```

Second, I set up REST API Gateways in all regions that did not support HTTP APIs to measure latency from the source system.

- Mexico (Central)
- Asia Pacific (Thailand)

Third, I set up a CloudFront Distribution with all Edge Locations enabled and a CloudFront Function to measure the closest geographic connection to determine if a Local Zone or Wavelength Zone might improve the user experience.

[https://whoami.4n6ir.com](https://whoami.4n6ir.com)

### Meet Laggy

Laggy measures network latency between the source and AWS Cloud regions.

[https://github.com/jblukach/laggy](https://github.com/jblukach/laggy)

### Command

```
laggy lag ipv6
```

### Output

```
Site: https://ipv6.use1.lag.4n6ir.com, Status: 200, Latency: 67.076901ms
Site: https://ipv6.use2.lag.4n6ir.com, Status: 200, Latency: 90.623354ms
Site: https://ipv6.cac1.lag.4n6ir.com, Status: 200, Latency: 98.473081ms
Site: https://ipv6.mxc1.lag.4n6ir.com, Status: 200, Latency: 184.195336ms
Site: https://ipv6.caw1.lag.4n6ir.com, Status: 200, Latency: 207.676092ms
Site: https://ipv6.euw1.lag.4n6ir.com, Status: 200, Latency: 240.632193ms
Site: https://ipv6.usw1.lag.4n6ir.com, Status: 200, Latency: 242.615685ms
Site: https://ipv6.usw2.lag.4n6ir.com, Status: 200, Latency: 251.712456ms
Site: https://ipv6.euw2.lag.4n6ir.com, Status: 200, Latency: 290.23341ms
Site: https://ipv6.euw3.lag.4n6ir.com, Status: 200, Latency: 297.067287ms
Site: https://ipv6.euc1.lag.4n6ir.com, Status: 200, Latency: 326.016987ms
Site: https://ipv6.euc2.lag.4n6ir.com, Status: 200, Latency: 332.574242ms
Site: https://ipv6.eus1.lag.4n6ir.com, Status: 200, Latency: 368.212421ms
Site: https://ipv6.eun1.lag.4n6ir.com, Status: 200, Latency: 377.801897ms
Site: https://ipv6.eus2.lag.4n6ir.com, Status: 200, Latency: 377.810183ms
Site: https://ipv6.sae1.lag.4n6ir.com, Status: 200, Latency: 389.082696ms
Site: https://ipv6.apne1.lag.4n6ir.com, Status: 200, Latency: 478.051017ms
Site: https://ipv6.ilc1.lag.4n6ir.com, Status: 200, Latency: 489.033075ms
Site: https://ipv6.mes1.lag.4n6ir.com, Status: 200, Latency: 522.903812ms
Site: https://ipv6.apne3.lag.4n6ir.com, Status: 200, Latency: 546.64706ms
Site: https://ipv6.apne2.lag.4n6ir.com, Status: 200, Latency: 567.207354ms
Site: https://ipv6.aps1.lag.4n6ir.com, Status: 200, Latency: 607.183247ms
Site: https://ipv6.apse2.lag.4n6ir.com, Status: 200, Latency: 630.877946ms
Site: https://ipv6.aps2.lag.4n6ir.com, Status: 200, Latency: 650.914864ms
Site: https://ipv6.mec1.lag.4n6ir.com, Status: 200, Latency: 656.125567ms
Site: https://ipv6.ape1.lag.4n6ir.com, Status: 200, Latency: 670.91294ms
Site: https://ipv6.apse4.lag.4n6ir.com, Status: 200, Latency: 703.355405ms
Site: https://ipv6.apse1.lag.4n6ir.com, Status: 200, Latency: 705.211195ms
Site: https://ipv6.afs1.lag.4n6ir.com, Status: 200, Latency: 713.259556ms
Site: https://ipv6.apse5.lag.4n6ir.com, Status: 200, Latency: 729.464198ms
Site: https://ipv6.apse7.lag.4n6ir.com, Status: 200, Latency: 731.402744ms
Site: https://ipv6.apse3.lag.4n6ir.com, Status: 200, Latency: 753.309031ms
```

### What Next

With the global infrastructure in place, it will be pretty easy to collect jitter and speed measurements to make data-driven decisions in the future.

Please feel free to adapt the Rust code to the sites that most matter to you!