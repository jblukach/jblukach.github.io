---
layout: post
title: "ClickOps #18 - Deploy API Gateway Logging"
author: "John Lukach"
tags: aws api gateway logs
---

I always want everything to be Infrastructure as Code (IaC); however, that is not always possible! While I can create the API Gateway Role for writing logs to CloudWatch, I do not have a way to perform the one-time configuration per region using the Cloud Development Kit (CDK).

[![api gateway logs](/images/2025/12/24/1-api-logging.png)](/images/2025/12/24/1-api-logging.png)

[![api gateway logs](/images/2025/12/24/2-api-logging.png)](/images/2025/12/24/2-api-logging.png)

[![api gateway logs](/images/2025/12/24/3-api-logging.png)](/images/2025/12/24/3-api-logging.png)

The API Gateway for HTTP has an issue with the CDK constructs on the automatic $Default stage for the logging configuration.

[![api gateway logs](/images/2025/12/24/4-api-logging.png)](/images/2025/12/24/4-api-logging.png)

[![api gateway logs](/images/2025/12/24/5-api-logging.png)](/images/2025/12/24/5-api-logging.png)

[![api gateway logs](/images/2025/12/24/6-api-logging.png)](/images/2025/12/24/6-api-logging.png)

[![api gateway logs](/images/2025/12/24/7-api-logging.png)](/images/2025/12/24/7-api-logging.png)
