---
layout: post
title: "Migrated #17 - GitHub fine-grained PATs for CDK Pipelines"
author: "John Lukach"
tags: AWS CDK GitHub Pipelines PATs
---

GitHub fine-grained personal access tokens (PATs) may only be available in beta, but the pros outweigh the cons for reducing the risk from the classic PATs blast radius.

![1-fine-grained-pat.png](/images/2023/02/1-fine-grained-pat.png)

CDK Pipelines requires the token must be stored in an AWS Secret Manager (ASM) secret called **github-token**.

![2-new-fine-grained-pat.png](/images/2023/02/2-new-fine-grained-pat.png)

Instead of having access to all repositories, the token can be scoped to a specific code base.

![3-fine-grained-repository-access.png](/images/2023/02/3-fine-grained-repository-access.png)

Initial CDK Pipeline setup only requires Metadata and Webhook permissions.

![4-fine-grained-access.png](/images/2023/02/4-fine-grained-access.png)

While the user interface (UI) says the token can live forever, it must be configured to expire in one year.

![5-fine-grained-ttl.png](/images/2023/02/5-fine-grained-ttl.png)

When adding permissions, the UI has inconsistent names for deploying additional resources, where these are my starting point. I may be able to reduce these more in the future.

![6-fine-grained-ui.png](/images/2023/02/6-fine-grained-ui.png)

##### Read Only

- Metadata

##### Read & Write

- Commit statuses
- Contents
- Pull requests
- Webhooks
