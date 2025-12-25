---
layout: post
title: "4n6ir #32 - AWS has Seventeen Regions Enabled by Default"
author: "John Lukach"
tags: AWS ControlTower GuardDuty SecurityHub
---

Amazon Web Services (AWS) has seventeen regions enabled by default that require protection.

- Asia Pacific (Tokyo)
- Asia Pacific (Seoul)
- Asia Pacific (Osaka)
- Asia Pacific (Mumbai)
- Asia Pacific (Singapore)
- Asia Pacific (Sydney)
- Canada (Central)
- Europe (Frankfurt)
- Europe (Stockholm)
- Europe (Ireland)
- Europe (London)
- Europe (Paris)
- South America (São Paulo)
- US East (N. Virginia)
- US East (Ohio)
- US West (N. California)
- US West (Oregon)

It is possible to use a Service Control Policy (SCP) that can deny access to specific AWS Regions.

[![Control Tower Region Deny](/images/2024/02/control-tower-region-deny.png)](/images/2024/02/control-tower-region-deny.png)

The caveat is that SCPs can not be applied to the AWS Management Account, leaving 17 active regions to protect. Traditionally, I had to have an Amazon GuardDuty account with matching active regions for delegated administration to limit deployments to the root account.

AWS Security Hub allows the aggregation of GuardDuty alerts from the management account even when delegated administration is enabled and regions are blocked.

[![Security Hub Aggregation Regions](/images/2024/02/security-hub-aggregation-regions.png)](/images/2024/02/security-hub-aggregation-regions.png)

With this approach, I can keep my account pattern consistent by only enabling GuardDuty in the Management Account for unused regions. The Security Hub integration should automatically start for GuardDuty but sometimes needs manual intervention to accept the findings.

[![Security Hub Guard Duty Integration](/images/2024/02/security-hub-guard-duty-integration.png)](/images/2024/02/security-hub-guard-duty-integration.png)

In active regions, I still use delegated administration of GuardDuty to the centralized Security account.
