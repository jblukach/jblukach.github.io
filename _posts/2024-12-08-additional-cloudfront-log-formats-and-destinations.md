---
layout: post
title: "4n6ir #43 - Additional CloudFront Log Formats and Destinations"
author: "John Lukach"
tags: aws cloudfront logs
---

Amazon Web Services (AWS) **pre:Invent** 2025 released additional CloudFront log format and destination options. 

[https://aws.amazon.com/about-aws/whats-new/2024/11/amazon-cloudfront-log-formats-destinations-access](https://aws.amazon.com/about-aws/whats-new/2024/11/amazon-cloudfront-log-formats-destinations-access)

This release was long overdue to improve efficiency for security monitoring.

**CloudWatch Logs (CWL)**

- JSON
- TEXT

**Kinesis Data Firehose**

- JSON
- TEXT
- RAW

**Simple Storage Service (S3)**

- W3C
- PARQUET
- JSON
- TEXT

[![cloudfront-settings.jpg](/images/2024/12/1-cloudfront-settings.jpg)](/images/2024/12/1-cloudfront-settings.jpg)

[![cloudfront-fields.jpg](/images/2024/12/2-cloudfront-fields.jpg)](/images/2024/12/2-cloudfront-fields.jpg)
