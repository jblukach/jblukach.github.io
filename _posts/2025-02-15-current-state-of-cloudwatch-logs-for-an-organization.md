---
layout: post
title: "4n6ir #47 - Current State of CloudWatch Logs for an Organization"
author: "John Lukach"
tags: aws botoplus cloudwatch cwl jupyter logs notebook python
---

One of the first questions is always: what logs do I have available?

[https://github.com/jblukach/botoplus](https://github.com/jblukach/botoplus)

I created a Jupyter Notebook that uses the ```botoplus``` Python library to gather the state of CloudWatch Logs across an Amazon Web Services (AWS) Organization for every account and region.

- Log Group Name
- Number of Days since Creation Time
- Number of Days for Log Retention
- Storage Bytes displayed in Estimated GBs
- Estimated Daily Price

Cost is calculated based on Standard and Infrequent access for the first 10 TB of data ingestion pricing.

Final calculations are outputs that include the following information:

- Total number of Log Groups
- Estimated daily data ingestion cost
- Estimated total data storage cost
- Estimated data storage in GBs

Too often, Log Groups are automatically created without retention configured. Thus, I needed a way to enforce the retention policy. Does anyone ever clean up CloudWatch Logs?

The final ```botoplus``` code example deletes empty Log Groups that are not protected from deletion.

```
/aws/lambda/aws-controltower-NotificationForwarder
```
