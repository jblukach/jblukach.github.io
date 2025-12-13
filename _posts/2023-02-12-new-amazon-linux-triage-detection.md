---
layout: post
title: "Migrated #18 - New Amazon Linux Triage Detection"
author: "John Lukach"
tags: Amazon AWS Linux Meta SHA256
---

### Likelihood

MMI detects if a sha256 hash, full path, or filename commonly occurs if found on five or more Amazon Machine Images (AMIs) for Amazon Linux. It helps identify files that potentially allow the opportunity to hide in plain sight. The ```common.bloom``` file contains 1,057,452 of 5,369481 total values.

[https://github.com/jblukach/mmi](https://github.com/jblukach/mmi)

The ```mmi.bloom``` file contains 1,941,059 values that only occur on a single AMI used when determining the quantity to qualify the likelihood.

### Self-Service

Having all the data in the world doesn't do any good if there isn't a way to use it. I have provided an API available for **FREE** to use in your incident response automation by providing the last updated timestamp with a filename containing the SHA256 hash to verify the downloaded zip file's integrity from the returned access link.

[https://store.lukach.io](https://store.lukach.io)

```python

import requests

key = ''
url = 'https://sha256.lukach.io/unique' # https://sha256.lukach.io/hashes

headers = {'x-api-key': key}

r = requests.get(url, headers = headers)

output = r.json()

d = requests.get(output['link'])

if d.status_code == 200:
    with open(output['filename'], 'wb') as f:
        f.write(d.content)

```
