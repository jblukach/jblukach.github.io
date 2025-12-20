---
layout: post
title: "4n6irBlog #34 - Do not forget the AWS Amplify Logs"
author: "John Lukach"
tags: aws amplify cloudfront access logs
---

I recently needed AWS Amplify logs for an investigation that became a painful experience; thus, I recommend adding an AWS Lambda that exports access logs daily with the provided Python example.

[Log File Format](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/AccessLogs.html#LogFileFormat)

### Python Libraries

```python
import boto3
import datetime
import gzip
import os
import requests
```

### Previous Day

```python
yesterday = datetime.datetime.now() - datetime.timedelta(days=1)
```

### Generate Access Logs

```python
    client = boto3.client('amplify', region_name = 'us-east-2')

    response = client.generate_access_logs(
        startTime = datetime.datetime(yesterday.year, yesterday.month, yesterday.day),
        endTime = datetime.datetime(yesterday.year, yesterday.month, yesterday.day),
        domainName = '4n6ir.com',
        appId = os.environ['APP_ID']
    )
```

### Download Access Logs

```python
d = requests.get(response['logUrl'])
```

### Set Filename

```python
fname = str(yesterday.year)+'-'+str(yesterday.month)+'-'+str(yesterday.day)+'-4n6ircom.csv'
```

### Write Access Logs

```python
    if d.status_code == 200:
        with open('/tmp/'+fname, 'wb') as f:
            f.write(d.content)
```

### Compress Access Logs

```python
    with open('/tmp/'+fname, 'rb') as f_in:
        with gzip.open('/tmp/'+fname+'.gz', 'wb') as f_out:
            f_out.writelines(f_in)
```

### Archive Access Logs

```python
    s3 = boto3.client('s3')

    s3.upload_file(
        '/tmp/'+fname+'.gz', 
        os.environ['S3_BUCKET'],
        'year='+str(yesterday.year)+'/month='+str(yesterday.month)+'/'+fname+'.gz'
    )
```
