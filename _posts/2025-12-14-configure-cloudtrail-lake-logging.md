---
layout: post
title: "ClickOps #8 - Configure CloudTrail Lake Logging"
author: "John Lukach"
tags: aws cloudtrail lake logs
---

CloudTrail is available by default in Event History, on a per-account, per-region basis, with a 90-day retention. I prefer to use CloudTrail Lake to centralize logs with 1-year retention, avoiding S3 hassles. 

The first step is to delegate CloudTrail administration to a new account to minimize management account overhead.

[![delegated administrator](/images/2025/12/14/1-cloudtrail.png)](/images/2025/12/14/1-cloudtrail.png)

[![delegated administrator](/images/2025/12/14/2-cloudtrail.png)](/images/2025/12/14/2-cloudtrail.png)

Switch to the delegated administrator account to start configuring the CloudTrail Lake.

[![cloudtrail lake](/images/2025/12/14/3-cloudtrail.png)](/images/2025/12/14/3-cloudtrail.png)

### Create event data store

[![cloudtrail lake](/images/2025/12/14/4-cloudtrail.png)](/images/2025/12/14/4-cloudtrail.png)

[![cloudtrail lake](/images/2025/12/14/5-cloudtrail.png)](/images/2025/12/14/5-cloudtrail.png)

### Choose events

[![cloudtrail lake](/images/2025/12/14/6-cloudtrail.png)](/images/2025/12/14/6-cloudtrail.png)

[![cloudtrail lake](/images/2025/12/14/7-cloudtrail.png)](/images/2025/12/14/7-cloudtrail.png)

### Enrich events, enable large events - optional

[![cloudtrail lake](/images/2025/12/14/8-cloudtrail.png)](/images/2025/12/14/8-cloudtrail.png)

Termination protection is now enabled by default, so one less step for a new deployment!

[![cloudtrail lake](/images/2025/12/14/9-cloudtrail.png)](/images/2025/12/14/9-cloudtrail.png)

[![cloudtrail lake](/images/2025/12/14/10-cloudtrail.png)](/images/2025/12/14/10-cloudtrail.png)
