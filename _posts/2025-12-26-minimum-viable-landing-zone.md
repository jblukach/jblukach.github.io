---
layout: post
title: "Builder #1 - Minimum Viable Landing Zone"
author: "John Lukach"
tags: aws minimum viable landing zone
---

AWS Control Tower became generally available on June 24th, 2019, as an official managed service, phasing out the AWS Landing Zone, a manual set of best practices. The other game in town was [AWS Organization Formation](https://github.com/org-formation), which launched a landing zone with the first release on March 10th, 2020. The dream behind Control Tower was to provide a simplified way to govern a secure, compliant AWS environment. On May 23rd, 2022, the initial [Landing Zone Accelerator on AWS](https://github.com/awslabs/landing-zone-accelerator-on-aws) was released to help address the shortcomings. I started spending a lot of time trying to work around the managed service landing zone to force it to fit my needs, at a cost, especially with the AWS Config requirement. On November 12th, 2025, the AWS Control Tower Landing Zone Version 4.0 release dropped, pushing me over the edge and prompting me to build my own **Minimum Viable Landing Zone (MVLZ)** after six years. I quickly learned that Amazon still has many click-through steps in the initial setup, with the tricky question of whether to click once or spend time on Infrastructure as Code (IaC), used only once.

### IAM Identity Center a.k.a. Single Sign-On (SSO)

First, I set up a brand-new management account and configured IAM Identity Center to allow me to stop using the **root** user.

- [ClickOps #3 - Enable IAM Identity Center](https://blog.lukach.io/2025/12/09/enable-iam-identity-center.html)

### Centralized CloudTrail & CloudWatch Logging

Second, I had a bug with account creation that required a support ticket, or setting up CloudTrail Lake for mission-critical logging would have been next.

- [ClickOps #8 - Configure CloudTrail Lake Logging](https://blog.lukach.io/2025/12/14/configure-cloudtrail-lake-logging.html)

The CloudWatch Logs Centralization feature creates a single pane of glass, significantly simplifying security investigations and observability.

- [ClickOps #20 - Centralized CloudWatch Observability](https://blog.lukach.io/2025/12/26/centralized-cloudwatch-observability.html)

### Security Monitoring & Alerting

Third, I enabled GuardDuty for security monitoring, which Security Hub CPSM centralizes for alerting of potential findings from a single account and region.

- [ClickOps #9 - Enable GuardDuty Threat Monitoring](https://blog.lukach.io/2025/12/15/enable-guardduty-threat-monitoring.html)
- [ClickOps #10 - Use Security Hub CSPM as Event Bus](https://blog.lukach.io/2025/12/16/use-security-hub-cspm-as-event-bus.html)
- [ClickOps #11 - Shipping Basic Security Alerts to Email
](https://blog.lukach.io/2025/12/17/shipping-basic-security-alerts-to-email.html)

### Mitigating Security Controls

Fourth, I have lived through security incidents occurring from the lack of MFA on root accounts and from public S3 buckets, both of which are preventable.

- [ClickOps #12 - Centralized Root Access Management](https://blog.lukach.io/2025/12/18/centralized-root-access-management.html)
- [ClickOps #13 - Block All S3 Public Bucket Access](https://blog.lukach.io/2025/12/19/block-all-s3-public-bucket-access.html)

### Cost Management & Notification

Fifth, I watch costs like a hawk, not just for budgetary reasons but also from a security perspective, for spikes in EC2 costs that may be a Crypto Miner or a new AWS service that requires review for security best practices.

- [ClickOps #15 - Enable Compute Optimizer Hub](https://blog.lukach.io/2025/12/21/enable-compute-optimizer-hub.html)
- [ClickOps #16 - Create Cost Anomaly Monitor](https://blog.lukach.io/2025/12/22/create-cost-anomaly-monitor.html)
- [ClickOps #17 - Create Advanced Budget Alert](https://blog.lukach.io/2025/12/23/create-advanced-budget-alert.html)

## First Repository Lift & Shift

At least now I can get back to doing security instead of running so much infrastructure with this **Minimum Viable Landing Zone (MVLZ)** environment. I have ported the [MaxMind GeoLite2](https://github.com/jblukach/geolite) stack to the new AWS environment to double-check that everything is working as expected.

### Continuous Improvement & Deployment

I use the Cloud Development Kit (CDK) for my Infrastructure as Code (IaC) when developing each project with AWS CodeBuild, enabling continuous deployment via the GitHub OpenID Connect (OIDC) integration.

- [ClickOps #5 - Cloud Development Kit Bootstrap](https://blog.lukach.io/2025/12/11/cloud-development-kit-bootstrap.html)
- [ClickOps #7 - Setup CodeBuild for Continuous Deployment
](https://blog.lukach.io/2025/12/13/setup-codebuild-for-continuous-deployment.html)

### Centralized Domain Name System (DNS)

I transferred all my domains to a central AWS account to simplify management using the [domains](https://github.com/jblukach/domains) repository.

- [ClickOps #6 - Transfer Domain to another AWS Account](https://blog.lukach.io/2025/12/12/transfer-domain-to-another-aws-account.html)

### Centralized Network Ingress

I switched from a distributed network ingress to a centralized model using the API Gateway from the [api](https://github.com/jblukach/api) repository to provide multi-region high-availability. I try to use IaC everywhere, but I ran into some CDK bugs that required me to use the UI for a couple of settings.

- [ClickOps #18 - Deploy API Gateway Logging](https://blog.lukach.io/2025/12/24/deploy-api-gateway-logging.html)
- [ClickOps #19 - Route53 Failover Routing Policy](https://blog.lukach.io/2025/12/25/route53-failover-routing-policy.html)

### Patching, Patching, and More Patching

I worked on a project earlier this year called [packages](https://blog.lukach.io/2025/03/23/aws-lambda-layer-patching.html) that was way over-engineered.
I went back to simplify that process, making it more sustainable, using the [stacksets](https://github.com/jblukach/stacksets) repository to provide updated Python Packages weekly that are scanned by GuadDuty Malare Protection for S3 Buckets.

- [ClickOps #14 - Malware Protection for S3 Buckets](https://blog.lukach.io/2025/12/20/malware-protection-for-s3-buckets.html)

### Centralized Data Processing

While [MaxMind GeoLite2](https://github.com/jblukach/geolite) is served up in both USE1 and USW2, which have failover domain routing, I do not need that level of availability for the data processing, which all lives in USE2.

### Next Steps

Next, I still need to expand the Service Control Policies (SCPs) to align with my previous landing zone capabilities and controls, strengthening the foundation, as it will always require iterative improvements.
