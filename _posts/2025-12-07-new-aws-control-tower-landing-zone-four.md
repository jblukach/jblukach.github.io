---
layout: post
title: "ClickOps #1 - New AWS Control Tower Landing Zone 4.0"
author: "John Lukach"
tags: aws management account control tower
---

I was excited for the release of AWS Control Tower Landing Zone Version 4.0 on November 12th, 2025, as it included the option to disable AWS Config. I have been running Control Tower with Config disabled for a long time now!

[https://docs.aws.amazon.com/en_us/controltower/latest/userguide//2025-all.html#lz-40](https://docs.aws.amazon.com/en_us/controltower/latest/userguide//2025-all.html#lz-40)

I was hesitant to update my landing zone because disabling Config with Control Tower indicated a breaking change in IAM Identity Center and Security Roles. Too often, AWS Organizations add more and more things to the mix, increasing complexity and the risk of unplanned outages. Just as with development practices, there needs to be at least development and production landing zones to promote operational and security changes for validation testing.

What would it take to migrate **"All of the Things!"** to a new AWS Cloud environment?

A lot of my AWS accounts have been around for a decade now, with lots of experiments, iterations, and hold my Diet Mountain Dew, I am going to try something here - fingers crossed.

I decided to build a brand-new Management Account and blog about the adventure, split into three series.

- ClickOps
- Infrastructure as Code (IaC)
- ScriptOps

I previously opened and set up a brand new Amazon Web Services (AWS) account to deploy my Control Tower Landing Zone too.

### Step 1 - Select a landing zone version and configure automatic account enrollment

![landing zone version selection](/images/2025/12/07/1-landing-zone.png)

### Step 2 - Updated governed regions

![update governed regions](/images/2025/12/07/2-landing-zone.png)

### Step 3 - Update service integrations

![update service integrations](/images/2025/12/07/3-landing-zone.png)

![update service integrations](/images/2025/12/07/4-landing-zone.png)

### Step 4 - Review and update landing zone

![review and update landing zone](/images/2025/12/07/5-landing-zone.png)

![review and update landing zone](/images/2025/12/07/6-landing-zone.png)

![review and update landing zone](/images/2025/12/07/7-landing-zone.png)

AWS Control Tower takes some time to configure the new Landing Zone when creating a new deployment. The Audit and Log Archive accounts in the Core OU are no longer required, as the Sandbox and Security OUs are the latest pattern. If I had enabled integrated services, Control Tower would have created the accounts in the Security OU.

I turn off the creation of VPC networks in the Account Factory configuration.

![edit account factory network configuration](/images/2025/12/07/8-landing-zone.png)

First, I get an unknown error when trying to use Account Factory; at least I can still create new accounts in the AWS Organization.

![unknown error occurred](/images/2025/12/07/9-landing-zone.png)

Second, I can not register OUs with Control Tower without enabling AWS Config and IAM Identity Center as part of the Landing Zone.

![register ou error](/images/2025/12/07/10-landing-zone.png)

The impact on the SCPs that Control Tower deploys, as the **Region Deny Control is not working**, is a bigger concern.

I had two choices: I could pay $29 to open a Business Support+ plan, or leave feedback on the bugs for the Control Tower team in the bottom-left corner.

![service feedback link](/images/2025/12/07/11-landing-zone.png)

If Business Support+ were not a per-account cost, I would have gone that route to help get this fixed!

![submit feedback forum](/images/2025/12/07/12-landing-zone.png)
