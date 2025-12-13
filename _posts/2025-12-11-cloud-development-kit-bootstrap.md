---
layout: post
title: "ClickOps #5 - Cloud Development Kit Bootstrap"
author: "John Lukach"
tags: aws cdk cloudformation stacksets bootstrap
---

CloudFormation StackSets is used to deploy the Cloud Development Kit (CDK) Bootstrap, which will help me move from ClickOps to Infrastructure-as-Code (IaC). In the management account, I need to enable trust access for the organization.

![organization trust](/images/2025/12/11/1-stacksets.png)

I previously set up a new StackSets account to register the delegated administrator from the management account.

![delegated administrator](/images/2025/12/11/2-stacksets.png)

In the StackSets account, I need to create an S3 bucket to host the CDK Bootstrap  CloudFormation template.

[https://github.com/jblukach/cdkv2/blob/main/bootstrap/template.yaml](https://github.com/jblukach/cdkv2/blob/main/bootstrap/template.yaml)

![s3 bucket](/images/2025/12/11/3-stacksets.png)

![s3 bucket](/images/2025/12/11/4-stacksets.png)

![s3 bucket](/images/2025/12/11/5-stacksets.png)

The S3 bucket needs the s3:GetObject permission across the organization, granted via a Bucket Policy.

![bucket policy](/images/2025/12/11/6-stacksets.png)

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": "*"
            },
            "Action": "s3:ListBucket",
            "Resource": "arn:aws:s3:::stacksets-deployment-lukach-io",
            "Condition": {
                "StringEquals": {
                    "aws:PrincipalOrgID": "o-xxxxxxxxxx"
                }
            }
        },
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": "*"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::stacksets-deployment-lukach-io/*",
            "Condition": {
                "StringEquals": {
                    "aws:PrincipalOrgID": "o-xxxxxxxxxx"
                }
            }
        }
    ]
}
```

Now I can set up a Service-Managed StackSet that handles the IAM permissions.

![stacksets](/images/2025/12/11/7-stacksets.png)

### Choose a template

![stacksets](/images/2025/12/11/8-stacksets.png)

### Specify stack set details

![stacksets](/images/2025/12/11/9-stacksets.png)

![stacksets](/images/2025/12/11/10-stacksets.png)

### Configure stack set options

![stacksets](/images/2025/12/11/11-stacksets.png)

### Set deployment options

![stacksets](/images/2025/12/11/12-stacksets.png)

![stacksets](/images/2025/12/11/13-stacksets.png)

### Review
