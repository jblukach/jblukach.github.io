---
layout: post
title: "ClickOps #9 - Enable GuardDuty Threat Monitoring"
author: "John Lukach"
tags: aws guardduty threat monitoring
---

Amazon GuardDuty is the core security monitoring for CloudTrail, VPC Flow Logs, and Route53 logs. It is essential to have GuardDuty running in every region enabled in the management account, since Service Control Policies (SCPs) are not applied.

![enable guardduty](/images/2025/12/15/1-guardduty.png)

In the management account, I first delegate administration to a new GuardDuty account before enabling it.

![guardduty error](/images/2025/12/15/2-guardduty.png)

GuardDuty will return the following error during configuration if not enabled in the management account.

![initial guardduty](/images/2025/12/15/3-guardduty.png)

I want to enable **Auto Enable** for GuardDuty so that when new accounts join the organization, they receive security monitoring by default.

![guardduty auto enable](/images/2025/12/15/4-guardduty.png)

In addition to the foundational data sources, I also added S3 Protect to monitor my buckets.

![enable guardduty](/images/2025/12/15/5-guardduty.png)

Now I click **Enable**, which starts GuardDuty for the organization in this region.

![publish gd findings](/images/2025/12/15/6-guardduty.png)

I also increased the frequency at which GuardDuty publishes findings. Rinse and repeat for the 17 default regions and any others that are available for full organization coverage.

![malware protection](/images/2025/12/15/7-guardduty.png)

Last step: log back into the management account and enable Malware Protection, which only needs to be done in a single region. It would be nice if the rest of GuardDuty weren't per-region settings, too.
