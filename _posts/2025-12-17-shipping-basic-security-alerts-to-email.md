---
layout: post
title: "ClickOps #11 - Shipping Basic Security Alerts to Email"
author: "John Lukach"
tags: aws eventbridge rule sns
---

If an alert goes off and no one knows about it, what is the point?

The simplest entry point is to set up email notifications using the Simple Notification Service (SNS) and an EventBridge Rule to alert on GuardDuty findings from the centralized Security Hub.

### Create SNS Topic

![sns topic](/images/2025/12/17/1-securityalert.png)

### Create Subscription

![sns subscription](/images/2025/12/17/2-securityalert.png)

![sns subscription](/images/2025/12/17/3-securityalert.png)

### Validate Email

![sns email validation](/images/2025/12/17/4-securityalert.png)

![sns email validation](/images/2025/12/17/5-securityalert.png)

### Create EventBridge Rule

![eventbridge rule](/images/2025/12/17/6-securityalert.png)

![eventbridge rule](/images/2025/12/17/7-securityalert.png)

![eventbridge rule](/images/2025/12/17/8-securityalert.png)

![eventbridge rule](/images/2025/12/17/9-securityalert.png)

![eventbridge rule](/images/2025/12/17/10-securityalert.png)
