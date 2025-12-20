---
layout: post
title: "ClickOps #12 - Centralized Root Access Management"
author: "John Lukach"
tags: aws lockdown mfa root
---

It is crucial to lock down the root account and enable multi-factor authentication (MFA). As the number of accounts in the organization increases, this becomes harder to sustain. Amazon released the Root Access Management feature to simplify the lockdown.

![enable root access](/images/2025/12/18/1-rootaccess.png)

![enable root access](/images/2025/12/18/2-rootaccess.png)

The theme continues: we want to limit everything we can in the management account by delegating administration to the identity account for the IAM team.

![enable root access](/images/2025/12/18/3-rootaccess.png)

![enable root access](/images/2025/12/18/4-rootaccess.png)

The number of supported items has not expanded much since the original release.

![root access features](/images/2025/12/18/5-rootaccess.png)
