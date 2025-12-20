---
layout: post
title: "4n6irBlog #48 - AWS Lambda Layer Patching"
author: "John Lukach"
tags: lambda layer pip python
---

Patching the never-ending security necessity!

I moved away from Docker Containers to AWS Lambda Layers to reduce my Serverless upkeep requirements. It worked great until it didn’t with the nine layers I was maintaining, and I ended up four months behind on patching. With new features released by Amazon, I decided it was time to fix the problem instead of another bandaid.

On the first day of the month at midnight UTC, a lambda download runs that captures and bundles the Python packages I use in my environment.

1. beautifulsoup4
2. censys
3. dnspython
4. geoip2
5. maxminddb
6. netaddr
7. pip
8. requests
9. smart_open[s3]

The zip files copy to buckets in each of the three actively used regions: USE1, USE2, and USW2. I use a boto3 resource S3 call to set the content type correctly so GuardDuty Malware Protection for S3 can scan the zip files. Using the boto3 client S3 call will put the content type to **application/octet-stream** by default, which is unsupported.

```python
        s3 = boto3.resource('s3', region_name = 'us-east-1')

        s3.meta.client.upload_file(
            '/tmp/'+package+'.zip',
            os.environ['USE1'],
            package+'.zip',
            ExtraArgs = {
                'ContentType': "application/zip"
            }
        )
```

I also record an updated date timestamp for each package to a standard SSM per region, which will be the AWS Layer description for continuous deployment.

I define the AWS Organization ID (o-xxxxxxxxxx) and the Management Account Number (xxxxxxxxxxxx) in advanced SSM per region, which allows me to share the Systems Manager Parameters by Resource Access Manager (RAM).

Lambda Layers are defined for all the required Python packages to support versions 3.9 to 3.13 in both X86_64 and ARM_64 architectures. RAM shares them with the organization with advanced SSM references to ARNs for inclusion in other deployments, except for pip, which has potential malintent.

I use AWS CodeBuild as the hosted GitHub Actions runner with a GitHub OpenID Connection. The role requires permission to perform Cloud Deployment Kit (CDK) builds based on the standard bootstrap.

[https://docs.aws.amazon.com/codebuild/latest/userguide/action-runner.html](https://docs.aws.amazon.com/codebuild/latest/userguide/action-runner.html)

Python packages are now regularly updated, improving the security posture!

[https://github.com/jblukach/packages](https://github.com/jblukach/packages)

The only downfall is importing a shared SSM parameter from ARN does not support a tokenized string, requiring the AWS account number to be displayed in the code.
