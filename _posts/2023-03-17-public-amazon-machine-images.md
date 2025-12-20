---
layout: post
title: "4n6irBlog #20 - Public Amazon Machine Images"
author: "John Lukach"
tags: Amazon Public AMIs
---

Amazon Web Services (AWS) currently has approximately **1,268,858** Public Amazon Machine Images (AMIs) in **27** regions from about **11,756** accounts. The risk is that these publically exposed resources could contain credentials that provide access to additional resources. I needed a way to passively and quickly scrub a list of account numbers looking for exposed resources regularly.

```python

import boto3
import hashlib
import requests

client = boto3.client('organizations')

paginator = client.get_paginator('list_accounts')
response_iterator = paginator.paginate()

response = requests.get('https://static.matchmeta.info/publicami.json')
data = response.json()

def calculate(account):
    hasher = hashlib.sha256()
    hasher.update(account.encode())
    sha256 = hasher.hexdigest().upper()
    return sha256

for page in response_iterator:
    for account in page['Accounts']:
        print('** '+account['Name']+' **')
        sha256 = calculate(account['Id'])
        for region in data['regions']:
            for value in region['sha256']:
                if value == sha256:
                    print(' - '+region['region'])

```
