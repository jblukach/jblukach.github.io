---
layout: post
title: "ClickOps #10 - Use Security Hub CSPM as Event Bus"
author: "John Lukach"
tags: aws security hub alerts
---

I like to use Security Hub CSPM as a security event bus to centralize alerts from multiple accounts and regions to a single location.

[![enable security hub](/images/2025/12/16/1-securityhub.png)](/images/2025/12/16/1-securityhub.png)

First, delegate administration to a new Security Hub account before enabling it in the management account.

[![initial security hub](/images/2025/12/16/2-securityhub.png)](/images/2025/12/16/2-securityhub.png)

Security Hub is notorious for automatically enabling security standards that I prefer to be disabled by default.  AWS Config is a dependency for security standards evaluations.

[![delegated administrator](/images/2025/12/16/3-securityhub.png)](/images/2025/12/16/3-securityhub.png)

I also shut off the auto-enablement of new security controls.

[![security hub configureation](/images/2025/12/16/4-securityhub.png)](/images/2025/12/16/4-securityhub.png)

### Start Centralized Configuration

[![security hub configureation](/images/2025/12/16/5-securityhub.png)](/images/2025/12/16/5-securityhub.png)

[![security hub configureation](/images/2025/12/16/6-securityhub.png)](/images/2025/12/16/6-securityhub.png)

[![security hub configureation](/images/2025/12/16/7-securityhub.png)](/images/2025/12/16/7-securityhub.png)

[![security hub configureation](/images/2025/12/16/8-securityhub.png)](/images/2025/12/16/8-securityhub.png)

[![security hub configureation](/images/2025/12/16/9-securityhub.png)](/images/2025/12/16/9-securityhub.png)

[![security hub configureation](/images/2025/12/16/10-securityhub.png)](/images/2025/12/16/10-securityhub.png)

If you receive any errors, you will likely need to remove the centralized configuration policy and the delegated administrator before re-applying.

[![security hub error](/images/2025/12/16/11-securityhub.png)](/images/2025/12/16/11-securityhub.png)

[![security hub error](/images/2025/12/16/12-securityhub.png)](/images/2025/12/16/12-securityhub.png)
