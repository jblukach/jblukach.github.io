---
layout: post
title: "Migrated #40 - Cloud Development Kit Garbage Collection"
author: "John Lukach"
tags: aws cdk ecr s3
---

Amazon Web Services (AWS) Cloud Development Kit (CDK) 2.165.0 released Garbage Collection (GC) on unused assets stored in the resources of your bootstrap stack

[https://docs.aws.amazon.com/cdk/v2/guide/ref-cli-cmd-gc.html](https://docs.aws.amazon.com/cdk/v2/guide/ref-cli-cmd-gc.html)

Cleaning up Elastic Container Registry (ECR) images is now much more manageable!

```
cdk gc --unstable=gc --profile 4n6ir --bootstrap-stack-name=StackSet-USE1-4n6ir --type=ecr
```
