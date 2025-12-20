---
layout: post
title: "4n6irBlog #9 - CloudTrail Principles for Success"
author: "John Lukach"
tags: AWS CloudTrail Expedition Index Lake
---

Amazon Web Services (AWS) CloudTrail provides event auditing, a critical foundation for operational troubleshooting and security monitoring of your cloud environments. Individuals to large organizations need these core CloudTrail Principles' abilities to benefit from the investment. 

1. Enable
2. Search
3. Alert
4. Review

##### Enable logging as no logs equals no problems

Luckily, enabled by default, CloudTrails are available with Event History lookup requests limited to two per second, per account, per region with ninety-day retention. Another option is setting up a centralized Trail to a logging account stored in a CloudWatch log group, S3 bucket, or both. Previously there was a significant amount of management overhead when securing these logs that got better with the following options.

- AWS Control Tower - [https://aws.amazon.com/controltower](https://aws.amazon.com/controltower)
- AWS Organization Formation - [https://github.com/org-formation](https://github.com/org-formation) 

##### Search logs quickly for troubleshooting

CloudWatch has basic search capabilities, but at **$0.50 per GB**, this quickly becomes cost prohibitive. Using S3 for storage lowers your costs significantly. Now you have to deal with ad-hoc Athena searches that run **$5.00 per TB** of data scanned.

##### Alert on events before becoming a bigger issue

CloudTrail Insights or GuardDuty can monitor and alert on suspicious events or operational issues. Usually, this requires going back to the well to gather enough details to support your investigation from these alerts. Amazon Detective might be an option, but the CloudTrail logs tend to get offloaded to a SIEM for correlation with other sources. 

##### Review the logs to know what is normal

Build metrics off the CloudTrail logs, allowing specific timeframes to be queried with unique keys to limit the volume of logs needing review.

##### CloudTrail Lake is a potential solution for everyone

CloudTrail Lake is a great way to reduce the complexity of your environments by satisfying the enable and search principles with easy access to additional data events.

- S3
- Lambda
- DynamoDB
- S3 Outposts
- Managed Blockchain
- S3 Object Lambda
- Lake Formation
- EBS Direct APIs
- S3 Access Points
- DynamoDB Streams
- FinSpace

Of course, we need to get the elephant in the room out of the way here, costs! CloudTrail Lake is a front-loaded investment where you initially pay **$2.50 per GB**, including seven years of storage. The monthly fees are only **$0.029 per GB** without any S3 and Athena resources, which is a very competitive value over that timeframe.

It also has a safety net by retaining logs for seven days after deletion for recovery in case of an accident or intruder trying to cover their tracks! 

##### What is missing to help secure the environments

I created an open-source project called **Expedition** that builds two indexes using CloudTrail Lake logs hourly.

[https://github.com/4n6ir/expedition](https://github.com/4n6ir/expedition)

The actions and errors indexes have the same fields, the difference being the **errorMessage** and **errorCode** column results. 

- eventSource
- eventName
- recipientAccountId
- awsRegion
- COUNT(*) AS apiCount

Indexes have become a critical investigation tool for narrowing your timeframe scope by being able to ask your infrastructure questions. 

When you pay by the GB searched, time frame reductions will also help reduce the investigation costs!

Generating the index allows an opportunity to create alarms for events identified by the SigmaHQ cloud ruleset for AWS.

[https://github.com/SigmaHQ/sigma](https://github.com/SigmaHQ/sigma)

The new Custom Widget for CloudWatch Dashboards is a great way to share and review the CloudTrail metrics publically, with a username/password, or by single sign-on!  

[https://aws.amazon.com/blogs/mt/introducing-amazon-cloudwatch-dashboards-custom-widgets](https://aws.amazon.com/blogs/mt/introducing-amazon-cloudwatch-dashboards-custom-widgets)

**Update:** Real-Time Cloud Trail Alerting

[https://github.com/4n6ir/expediate](https://github.com/4n6ir/expediate)

