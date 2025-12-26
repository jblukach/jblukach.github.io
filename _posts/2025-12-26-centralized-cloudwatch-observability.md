---
layout: post
title: "ClickOps #20 - Centralized CloudWatch Observability"
author: "John Lukach"
tags: aws centralized cloudwatch observability
---

On [September 17, 2025](https://aws.amazon.com/about-aws/whats-new/2025/09/amazon-cloudwatch-cross-account-cross-region-log-centralization/), Amazon Web Services (AWS) released one of my favorite new features of the year, [CloudWatch Logs Centralization](https://aws.amazon.com/blogs/mt/simplifying-log-management-using-amazon-cloudwatch-logs-centralization/).

```
The first copy of centralized logs comes with no additional ingestion charges or cross-region data transfer costs, with customers paying standard CloudWatch storage costs and feature pricing.
```

Dramatically reducing the complexity for security monitoring and alerting by having a single pane of glass. I was also able to reduce my CloudWatch Alarms to an organization-level view instead of per-function, since I can now quickly find the lambda in an error state. Also, reducing my top monthly spend significantly.

In the management account, I first needed to enable trusted access for CloudWatch.

[![centralized cloudwatch](/images/2025/12/26/1-cloudwatch.png)](/images/2025/12/26/1-cloudwatch.png)

[![centralized cloudwatch](/images/2025/12/26/2-cloudwatch.png)](/images/2025/12/26/2-cloudwatch.png)

[![centralized cloudwatch](/images/2025/12/26/3-cloudwatch.png)](/images/2025/12/26/3-cloudwatch.png)

I next need to register the delegated administrator for CloudWatch.

[![centralized cloudwatch](/images/2025/12/26/4-cloudwatch.png)](/images/2025/12/26/4-cloudwatch.png)

[![centralized cloudwatch](/images/2025/12/26/5-cloudwatch.png)](/images/2025/12/26/5-cloudwatch.png)

Now I can switch to the new CloudWatch account to configure it as the monitoring account. Since the first copy is free, I select all the data sources for the organization identifier.

[![centralized cloudwatch](/images/2025/12/26/6-cloudwatch.png)](/images/2025/12/26/6-cloudwatch.png)

[![centralized cloudwatch](/images/2025/12/26/7-cloudwatch.png)](/images/2025/12/26/7-cloudwatch.png)

Then I need to link all the accounts using Organization StackSets. These need to be deployed per region and have unique identifiers. I also enable CloudWatch Telemetry Configuration for each region I use.

[![centralized cloudwatch](/images/2025/12/26/8-cloudwatch.png)](/images/2025/12/26/8-cloudwatch.png)

[![centralized cloudwatch](/images/2025/12/26/9-cloudwatch.png)](/images/2025/12/26/9-cloudwatch.png)

Next, I configure the centralization rule to consolidate all CloudWatch data into the central USE2 region within the CloudWatch account.

[![centralized cloudwatch](/images/2025/12/26/10-cloudwatch.png)](/images/2025/12/26/10-cloudwatch.png)

[![centralized cloudwatch](/images/2025/12/26/11-cloudwatch.png)](/images/2025/12/26/11-cloudwatch.png)

[![centralized cloudwatch](/images/2025/12/26/12-cloudwatch.png)](/images/2025/12/26/12-cloudwatch.png)

[![centralized cloudwatch](/images/2025/12/26/13-cloudwatch.png)](/images/2025/12/26/13-cloudwatch.png)

Finally, I enable resource tags on telemetry to unlock advanced CloudWatch capabilities for each region I use.

[![centralized cloudwatch](/images/2025/12/26/14-cloudwatch.png)](/images/2025/12/26/14-cloudwatch.png)

My initial use case is a CloudWatch Alarm that monitors all Lambda error metrics in the active regions, triggering an SNS Topic that sends an email alert. The code is available in my [cloudwatch](https://github.com/jblukach/cloudwatch) repository.
