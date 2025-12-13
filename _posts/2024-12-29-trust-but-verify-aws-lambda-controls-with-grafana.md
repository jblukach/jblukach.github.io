---
layout: post
title: "Migrated #44 - Trust but verify AWS Lambda controls with Grafana"
author: "John Lukach"
tags: aws botoplus error grafana jupyter lambda notebook observability python
---

Lambda is the workhorse of many AWS security capabilities that must function trustfully!

One of many examples, AWS Secrets Manager, uses a Lambda function to auto-rotate credentials as part of the security control implementation.

**Does anyone notice if a lambda fails in an organization without observability configured?**

Amazon CloudWatch Alarms and Logs with Subscription Filters allow for proactive preparation for the AWS environment's observability. 

Things happen, requiring the creation of a Jupyter Notebook to gain this triage visibility quickly.

[https://github.com/jblukach/botoplus](https://github.com/jblukach/botoplus?tab=readme-ov-file#grafana)

Amazon Managed Grafana is the fastest route as long as no more than **100** alert rules are required, a non-adjustable quota.

![create-workspace.png](/images/2024/12/1-create-workspace.png)

![specify-workspace-details.png](/images/2024/12/2-specify-workspace-details.png)

![configure-settings-warning.png](/images/2024/12/3-configure-settings-warning.png)

![configure-settings.png](/images/2024/12/4-configure-settings.png)

![additional-configuration.png](/images/2024/12/5-additional-configuration.png)

![more-configuration.png](/images/2024/12/6-more-configuration.png)

![iam-settings.png](/images/2024/12/7-iam-settings.png)

![data-sources.png](/images/2024/12/8-data-sources.png)

Grafana Cloud has a soft limit of **2,000** alert rules on paid plans if necessary for larger environments.

[https://grafana.com](https://grafana.com/)
