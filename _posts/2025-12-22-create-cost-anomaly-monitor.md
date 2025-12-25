---
layout: post
title: "ClickOps #16 - Create Cost Anomaly Monitor"
author: "John Lukach"
tags: aws budget cost anomaly
---

AWS automatically created a cost anomaly monitor when I made the new management account. I cleared out the default so I could set up my own.

[![cost anomaly](/images/2025/12/22/1-cost-anomaly.png)](/images/2025/12/22/1-cost-anomaly.png)

[![cost anomaly](/images/2025/12/22/2-cost-anomaly.png)](/images/2025/12/22/2-cost-anomaly.png)

[![cost anomaly](/images/2025/12/22/3-cost-anomaly.png)](/images/2025/12/22/3-cost-anomaly.png)

I am interested in being notified of any service cost increases of 10%. I wanted to do increments, but I was only allowed one AWS Services monitor.

[![cost anomaly](/images/2025/12/22/4-cost-anomaly.png)](/images/2025/12/22/4-cost-anomaly.png)

[![cost anomaly](/images/2025/12/22/5-cost-anomaly.png)](/images/2025/12/22/5-cost-anomaly.png)

Detections can only be alerted by an SNS Topic, so I used an email subscription for now.

[![cost anomaly](/images/2025/12/22/6-cost-anomaly.png)](/images/2025/12/22/6-cost-anomaly.png)

[![cost anomaly](/images/2025/12/22/7-cost-anomaly.png)](/images/2025/12/22/7-cost-anomaly.png)
