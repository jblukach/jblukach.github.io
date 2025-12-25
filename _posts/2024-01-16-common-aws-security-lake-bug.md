---
layout: post
title: "4n6ir #31 - Common AWS Security Lake Bug"
author: "John Lukach"
tags: Amazon Security Lake
---

Amazon Security Lake should be the default solution for collecting and searching Route53 Query and VPC Flow logs. The savings for indirect staffing costs alone to manage the logging configurations is a quick win!

 - $0.25 per GB  for Security Lake Collection
 - $0.035 per GB for Security Lake Normalization

Add in some Athena and S3 costs for a price that is hard to beat.

However, as I use Security Lake more, there is a common bug where Athena searches successfully run but do not return any results. Both potential problems lie with the automatically generated Lambda deployed in each activated region.

```
SecurityLake_Glue_Partition_Updater_Lambda_1_0_us-east-2
```

First, the SQS Lambda Trigger for **SecurityLake_us-east-2_MAIN_QUEUE_1_0** is not always enabled.

[![Security Lake SQS Lambda Trigger](/images/2024/01/lambda.jpg)](/images/2024/01/lambda.jpg)

Second, the deployed Lambda does not receive the correct KMS grant. Swapping the role to a temporary one and back again has worked best.

[https://repost.aws/knowledge-center/lambda-kmsaccessdeniedexception-errors](https://repost.aws/knowledge-center/lambda-kmsaccessdeniedexception-errors)

Redrive **SecurityLake_us-east-2_DLQ_1_0** messages from the dead-letter queue to resolve the Athena search result issue.
