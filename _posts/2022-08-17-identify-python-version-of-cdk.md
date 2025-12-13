---
layout: post
title: "Migrated #10 - Identify Python Version of CDK"
author: "John Lukach"
tags: AWS CDK Python
---

Identifying the version of Amazon Web Services (AWS) Cloud Development Kit (CDK) is easy when pinned in the Python **requirements.txt** file.

```python
aws-cdk-lib==2.78.0
```

Projects may have the pinned version removed for continuous deployments making it hard to identify the exact CDK installation.

Using the **cdk.json** file to estimate the project's version based on line count is possible.

| Version | Number of Lines |
|---------------------------|
| 2.0.0   | 24              |
| 2.4.0   | 28              |
| 2.8.0   | 29              |
| 2.9.0   | 30              |
| 2.18.0  | 31              |
| 2.21.0  | 32              |
| 2.27.0  | 33              |
| 2.28.0  | 34              |
| 2.29.0  | 35              |
| 2.31.0  | 36              |
| 2.32.0  | 37              |
| 2.35.0  | 38              |
| 2.38.0  | 40              |
| 2.51.0  | 38              |
| 2.59.0  | 39              |
| 2.60.0  | 41              |
| 2.61.0  | 42              |
| 2.65.0  | 44              |
| 2.66.0  | 45              |
| 2.67.0  | 47              |
| 2.68.0  | 48              |
| 2.72.0  | 49              |
| 2.78.0  | 51              |
| 2.83.0  | 52              |
| 2.84.0  | 53              |
| 2.88.0  | 55              |
| 2.93.0  | 58              |
| 2.97.0  | 60              |
| 2.98.0  | 61              |
| 2.104.0 | 62              |

I use the following GitHub repository to track this information.

[https://github.com/jblukach/cdkv2](https://github.com/jblukach/cdkv2)
