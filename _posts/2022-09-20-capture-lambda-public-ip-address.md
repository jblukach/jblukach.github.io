---
layout: post
title: "4n6irBlog #11 - Capture Lambda Public IP Address"
author: "John Lukach"
tags: AWS CDK Extension Lambda Python
---

A Lambda not connected to a VPC pulls its public egress IP address from the shared Amazon pool. The problem occurs when that IP address for log correlation does not get recorded for investigation or troubleshooting. One option is to use a NAT Gateway with a static EIP that adds cost. It also can add complications during deployments when the ENI is attached to the VPC, taking significant time. Re-deployment to attach the existing Lambda to a VPC might not be an option making Lambda Extensions a potentially promising alternative.

The Lambda Extension allows you to attach an existing Function to run in the same execution environment by sharing CPU, Memory, Disk Storage, Environment Variables, and IAM Permissions. Lambda supports up to 10 extensions (multiple per layer) and up to 5 layers per function, counting against the unzipped deployment package size limit of 250 MB. It adds benefits but introduces potential threats that justify defining an SCP to mitigate the risk.

##### Potential Threats:

- Do you trust the external Lambda Extension or Lambda Layer attached to the Lambda Function not to inject malicious code? 
- Lambda Layers do not show if they are publically shared or have access granted to external AWS Accounts in the console, making a potential route for limited data exfiltration.

I have created Lambda Extention that captures the Public IP Address by visiting this AWS site to help reduce the request latency.

[https://checkip.amazonaws.com](https://checkip.amazonaws.com)

The Lambda Extension returns the following log entry in the Cloud Watch Logs.

```
[get-public-ip] 3.216.79.240
```

Code is available for review and consumption on Python 3.7, 3.8, and 3.9 Lambda functions running x64 and ARM platforms. Even though Python 2.7 and 3.6 are end-of-life, a few regions are still supported but not deployed.

[https://github.com/4n6ir/getpublicip](https://github.com/4n6ir/getpublicip)

**Update:** Another alternative that uses the Lambda Function URL feature.  

[https://medium.com/cloud-security/lambda-networking-72e2b915f31b](https://medium.com/cloud-security/lambda-networking-72e2b915f31b)
