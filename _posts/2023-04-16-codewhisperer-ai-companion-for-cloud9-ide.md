---
layout: post
title: "4n6ir #22 - CodeWhisperer AI companion for Cloud9 IDE"
author: "John Lukach"
tags: Artificial Intelligence CodeWhisperer Cloud9
---

I needed to determine that because I could use Amazon CodeWhisperer, an Artificial Intelligence (AI) coding companion, it didn’t necessarily mean I should use it due to intellectual property concerns.

I started to use a professional tier that I could tie to AWS IAM Identity Center (previously AWS SSO), which was disappointing as limited to US East (N. Virginia).

Luckily Cloud9 does not require an AWS Builder ID like Visual Studio and JetBrains IDEs for the individual tier, as that method is independent of the AWS Organization. Allows an Identity & Access Management (IAM) policy to be attached to the Cloud9 instance profile.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "CodeWhispererPermissions",
      "Effect": "Allow",
      "Action": [
        "codewhisperer:GenerateRecommendations"
      ],
      "Resource": "*"
    }
  ]
}
```

A few disadvantages of using Cloud9 over the other IDEs include limited language support (only Java, JavaScript, & Python) and no built-in security scan support.

Super simple to enable and accept the CodeWhisperer terms of services from any region with AWS Cloud9 available. 

[![cloud9-terms-of-service](/images/2023/04/cloud9-terms-of-service.png)](/images/2023/04/cloud9-terms-of-service.png)

**Win**, I can choose not to share with CodeWhisperer for service improvement.

[![code-whisperer-switches](/images/2023/04/code-whisperer-switches.png)](/images/2023/04/code-whisperer-switches.png)

[![code-whisperer-share-content](/images/2023/04/code-whisperer-share-content.png)](/images/2023/04/code-whisperer-share-content.png)

Even better, I can also opt out of sharing for all AI services at AWS.

[![ai-services-opt-out](/images/2023/04/ai-services-opt-out.png)](/images/2023/04/ai-services-opt-out.png)

**Yes**, I should be using Amazon CodeWhisperer for improved developer productivity.

##### Keyboard Shortcuts

- Manually fetch a code suggestion
  - Option + C (Apple)
  - ALT + C (Microsoft)
- TAB or ENTER key to accept code suggestions
- ESC or keep typing to reject code suggestions

##### Browser Compatibility

[![cookie-warning-message.png](/images/2023/04/cookie-warning-message.png)](/images/2023/04/cookie-warning-message.png)
