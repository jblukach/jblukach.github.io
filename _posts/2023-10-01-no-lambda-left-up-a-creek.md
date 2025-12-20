---
layout: post
title: "4n6irBlog #26 - No Lambda Left Up A Creek"
author: "John Lukach"
tags: AWS CDK Extension Lambda PublicIP Python 
---

It is not if but when you will need the public IP address from a Lambda execution to correlate against Cloud Trail logs during an incident so as not to end up a creek without a paddle. 

![Ozark Kayaking](/images/2023/10/ozark.jpg)

If the Lambda is not attached to the VPC, please at least capture the public IP address to Cloud Watch Logs using a Lambda Extension for both Container and Packaged functions, as the preparation will be well worth the extra compute costs for this ephemeral artifact.

[https://github.com/4n6ir/getpublicip](https://github.com/4n6ir/getpublicip)

Lambda Extension supports Python 3.7, 3.8, 3.9, 3.10, & 3.11 on ARM_64 and X86_64 architectures in all regions

Deploying the CDK project may not be an option, so I have made it available in the AWS Serverless Application Repository.

[https://serverlessrepo.aws.amazon.com](https://serverlessrepo.aws.amazon.com)

The SAM template is region-independent and available even if other regions have problems, as an ad-hoc addition option for packaged functions exists.

AWS Serverless Application Repository is only available in 18 of 28 regions, so I had to make the Lambda Layer public in each region to provide full coverage.

I also released support for Lambda Containers to capture public IP addresses by adding the Extension to the Dockerfile.

[https://gallery.ecr.aws/forensicir/getpublicip](https://gallery.ecr.aws/forensicir/getpublicip)

If the Amazon ECR Public Gallery is unavailable, I have made the private ECR public in each region; it requires Docker authentication.

[https://docs.aws.amazon.com/AmazonECR/latest/userguide/getting-started-cli.html#cli-authenticate-registry](https://docs.aws.amazon.com/AmazonECR/latest/userguide/getting-started-cli.html#cli-authenticate-registry)

Anything that can go wrong will, thus, need to be prepared for what I can control, as not having the public IP address during a Lambda investigation does not usually turn out well!
