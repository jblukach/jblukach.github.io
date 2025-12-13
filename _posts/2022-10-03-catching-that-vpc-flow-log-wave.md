---
layout: post
title: "Migrated #12 - Catching that VPC Flow Log Wave"
author: "John Lukach"
tags: AWS CDK Flows Index Lake VPC
---

Millions, billions, trillions, or more of VPC Flow Logs got collected into a central S3 bucket. What can we do with the data that adds value to the business to support security and troubleshooting for continued collection justification?

![VPC-Flow-Logs-Wave](/images/2022/10/VPC-Flow-Logs-Wave.jpg)

Image Source: [https://www.chrisfarris.com/post/aws-ir/](https://www.chrisfarris.com/post/aws-ir/)

Please ensure to capture Version 5 of VPC Flows to obtain the most valuable artifacts for tracing network connectivity across the environment.

[https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html#flow-logs-fields](https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html#flow-logs-fields)

Kinesis Firehose is a new feature released in September 2022 that works excellent for cross-account VPC Flow Log shipping.

![S3-Log-Settings1](/images/2022/10/S3-Log-Settings1.jpg)

Choose Apache Parquet as the Log format, a columnar data that provides a cost-effective option as Athena bills by the volume of data searched.

Enable Hive-compatible S3 prefixes to make adding new partitions more efficient without requiring additional Glue resources.

![S3-Log-Settings2](/images/2022/10/S3-Log-Settings2.jpg)

Paying by the GB requires a way to narrow the search without having to go back to the well. An index with the IP Address as the primary key and a sort key with additional characteristics are available to help pivot during the investigation.

- Accepted or Rejected
- Source or Destination
- Year, Month, Day & Hour

If you need a way to operationalize your VPC Flows Logs, this option might be the way to go!

[https://github.com/4n6ir/forensicvpc](https://github.com/4n6ir/forensicvpc)
