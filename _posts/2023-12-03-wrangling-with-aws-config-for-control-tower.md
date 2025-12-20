---
layout: post
title: "4n6irBlog #29 - Wrangling with AWS Config for Control Tower"
author: "John Lukach"
tags: AWS Config Python Control Tower
---

I have wanted to run the AWS Config service for cloud integrity monitoring but always collided with obstacles. I run Control Tower in my security research AWS Organization just in case I need to **"hold my beer"** and try something for my **$DayJob**. Manually enabling AWS Config was not an enjoyable experience, with the only viable option being AWS Systems Manager Quick Setup. AWS recently added a one-click setup option on the AWS Config dashboard. Both methods would create a duplicate recorder for governed regions in the Control Tower environment. AWS Config is my top monthly expense, and I didn't want to worsen it.

Control Tower can govern the twenty-eight public regions I have enabled in my organization. I have hesitated to go this route due to cost, but the option for timeline analysis during incidents would be precious. The release of the possibility for daily recordings to reduce costs makes this more attractive.

[https://aws.amazon.com/blogs/mt/how-to-record-resource-configuration-changes-periodically-with-aws-config](https://aws.amazon.com/blogs/mt/how-to-record-resource-configuration-changes-periodically-with-aws-config)

Control Tower deploys continuous recorders to all governed regions except the management account. The trick is to see if I can switch the AWS Config recorders to daily without getting the environment out of sync. Assuming the **AWSControlTowerExecution** role from the management account with this Jupyter Notebook resolves it. Ensure that global resources for only the home region are enabled; this prevents duplicate records.

[https://github.com/botoplus/botoplus/blob/main/notebooks/controltower/periodic-daily-donfig-recordings.ipynb](https://github.com/botoplus/botoplus/blob/main/notebooks/controltower/periodic-daily-donfig-recordings.ipynb)

There are still benefits to continuous monitoring for events required in real-time due to the risk that needs threat detection. One example is if you use AWS Firewall Manager for Advanced  Shield, Network Firewall, Route53 Resolver DNS Firewall, VPC Security Groups, or Web Application Firewall management.

[https://docs.aws.amazon.com/waf/latest/developerguide/enable-config.html](https://docs.aws.amazon.com/waf/latest/developerguide/enable-config.html)

Having all the logs in the world doesn't do any good unless there are notifications for when there are problems. Security Hub provides an event bus to collect alerts for central monitoring. Adoption of SecurityHub used to be challenging as it auto-enabled security standards that ran up the bill until you could get them disabled in every region.

[https://aws.amazon.com/blogs/security/introducing-new-central-configuration-capabilities-in-aws-security-hub](https://aws.amazon.com/blogs/security/introducing-new-central-configuration-capabilities-in-aws-security-hub)

AWS Config should automatically enable with Security Hub, but it is very sporadic with the Control Tower deployment. I created another Jupyter Notebook to manage integrations in every region. Hopefully, AWS can also get the Security Hub integrations managed centrally.

[https://github.com/botoplus/botoplus/blob/main/notebooks/securityhub/minimal-cost-configuration.ipynb](https://github.com/botoplus/botoplus/blob/main/notebooks/securityhub/minimal-cost-configuration.ipynb)

The last item is to collect the AWS Config logs to search easily to support investigations. I had used Cloud Trail Lake back when it cost $2.50 per GB and quickly switched to the Security Lake preview release. It is worth the new price at $0.50 per GB for the time savings alone.

[https://aws.amazon.com/blogs/mt/announcing-aws-cloudtrail-lake-one-year-extendable-retention-pricing-option](https://aws.amazon.com/blogs/mt/announcing-aws-cloudtrail-lake-one-year-extendable-retention-pricing-option)

Only time will tell as I run this AWS Config deployment iteration, as I now have the logs enabled, collected, optimized, and searchable with alerts for cloud security operations.
