---
layout: post
title: "Migrated #3 - System Manager Quick Setup"
author: "John Lukach"
tags: AWS SSM System Manager
---

EC2 Global-View works for a single AWS account, but AWS System Manager Quick Setup can provide an Organization EC2 Inventory. Start by defining a home AWS region that cannot be changed once chosen in the management account.

![System Manager Quick Setup](/images/2021/12/ssm-1.jpeg)

Create System Manager Quick Setup by choosing the Host Management configuration type and clicking next.

![System Manager Quick Setup](/images/2021/12/ssm-2.jpeg)

The primary goal of building an Organization EC2 Inventory requires no configuration options to use System Manager Explorer as the centralized UI initially.

![System Manager Quick Setup](/images/2021/12/ssm-3.jpeg)

A good inventory requires targeting all accounts and regions in the organization.

![System Manager Quick Setup](/images/2021/12/ssm-4.jpeg)

If you decide to use the Amazon Cloud Watch or System Manager Agents, this step provides an easy way to grant the necessary IAM permissions. I would recommend using VPC Endpoints to protect the EC2 and SSM endpoints.

![System Manager Quick Setup](/images/2021/12/ssm-5.jpeg)

Click create and let the process run, as it will take some time depending on selected options and the number of accounts/regions enabled.

![System Manager Quick Setup](/images/2021/12/ssm-6.jpeg)

The last setup item in the management account to configure is the delegation of administration for Systems Manager Explorer under Settings.

![System Manager Quick Setup](/images/2021/12/ssm-7.jpeg)

The System Manager Explorer Delegated Administrator account needs a resource data-sync configured to collect the Organization EC2 Inventory; be patient initially.

![System Manager Quick Setup](/images/2021/12/ssm-8.jpeg)

Success!! Searching by tags requires the reporting tags to be configured in each account and region with a limit of 5, unfortunately.

![System Manager Quick Setup](/images/2021/12/ssm-9.jpeg)

The aqueduct script makes it easy to push the command-line configuration to all accounts and regions using SSO for authentication and authorization. Remember, not all regions in this example support all services, such as Osaka (ap-northeast-3).

```
aws ssm update-service-setting --setting-id '/ssm/opsitem/resourceTags' --setting-value "[\"Name\",\"aws:cloudformation:stack-name\"]"
```

[https://github.com/jblukach/aqueduct](https://github.com/jblukach/aqueduct)
