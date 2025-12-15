---
layout: post
title: "ClickOps #6 - Transfer Domain to another AWS Account"
author: "John Lukach"
tags: aws dns domain hostzone route53
---

Now that CloudFormation StackSets has deployed the Cloud Development Kit (CDK) Bootstrap, I can start using Infrastructure as Code (IaC) from my GitHub Profile to set up Route53 Public Host Zones.

[https://github.com/jblukach/domains](https://github.com/jblukach/domains)

The host zone in the destination account must exist before transferring the name servers from the existing account to avoid a DNS interruption.

![transfer domain out](/images/2025/12/12/1-registered-domains.png)

![transfer domain out](/images/2025/12/12/2-registered-domains.png)

![transfer domain out](/images/2025/12/12/3-registered-domains.png)

Once the new host zone has taken over the name servers to provide DNS, I am ready to transfer the registered domain. The first step is to turn off the transfer lock, which will trigger a security email notification.

![transfer lock](/images/2025/12/12/4-registered-domains.png)

Once the transfer lock is off, the domain transfer to another AWS account can begin.

![transfer domain out](/images/2025/12/12/5-registered-domains.png)

![transfer domain out](/images/2025/12/12/6-registered-domains.png)

![transfer domain out](/images/2025/12/12/7-registered-domains.png)

Now go to the new AWS account that will host the domain, select the domain, and enter the generated password. Historically, this required a support ticket, which delayed the domain transfer.

![transfer domain in](/images/2025/12/12/8-registered-domains.png)

![transfer domain in](/images/2025/12/12/9-registered-domains.png)

Remember to turn the transfer lock back on!

![transfer lock](/images/2025/12/12/10-registered-domains.png)
