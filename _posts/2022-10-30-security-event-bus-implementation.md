---
layout: post
title: "4n6ir #15 - Security Event Bus Implementation"
author: "John Lukach"
tags: AWS Bus Event Hub Python Security
---

##### BUILD VS. BUY

Out of the box, AWS Security Hub provides an event bus that can collect findings from all regions in all accounts of the organization to a central aggregation point that works slick.

[https://github.com/4n6ir/shipit](https://github.com/4n6ir/shipit)

Delegating administration of AWS Security Hub to a dedicated account enables AWS Foundational Security Best Practices security standard.  

Additionally, some integrations get enabled by default in each region.

AWS Security Hub pricing counts the number of checks and ingested findings. I could deploy an Amazon Event Bridge option. There is no point in re-inventing the wheel when managing the enabled security standards and integrations makes a cost-effective solution.

##### STANDARDS

```python
import boto3

securityhub = boto3.client('securityhub')

paginator = securityhub.get_paginator('get_enabled_standards')

pages = paginator.paginate()

for page in pages:
    for subscriptions in page['StandardsSubscriptions']:
        securityhub.batch_disable_standards(
            StandardsSubscriptionArns = [
                subscriptions['StandardsSubscriptionArn']
            ]
        )
```

##### INTEGRATIONS

```python
import boto3

securityhub = boto3.client('securityhub')

paginator = securityhub.get_paginator('list_enabled_products_for_import')

pages = paginator.paginate()

for page in pages:
    for products in page['ProductSubscriptions']:
        parsed = products.split('/')
        if parsed[2] != 'access-analyzer' and \
          parsed[2] != 'config' and parsed[2] != 'health' and \
          parsed[2] != 'inspector' and parsed[2] != 'securityhub':
            securityhub.disable_import_findings_for_product(
                ProductSubscriptionArn = products
            )
```
