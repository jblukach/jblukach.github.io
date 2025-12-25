---
layout: post
title: "ClickOps #7 - Setup CodeBuild for Continuous Deployment"
author: "John Lukach"
tags: aws cicd codebuild github actions oidc
---

I want all my stacks to deploy once a month with CodeBuild for Continuous Deployment, triggered by a GitHub Action that uses an OpenID Connect (OIDC) provider.

[![github oidc](/images/2025/12/13/1-codebuild.png)](/images/2025/12/13/1-codebuild.png)

[![github oidc](/images/2025/12/13/2-codebuild.png)](/images/2025/12/13/2-codebuild.png)

### Start builds from your repositories

[![codebuild deployment](/images/2025/12/13/3-codebuild.png)](/images/2025/12/13/3-codebuild.png)

### Create Build Project

[![codebuild deployment](/images/2025/12/13/4-codebuild.png)](/images/2025/12/13/4-codebuild.png)

[![codebuild deployment](/images/2025/12/13/5-codebuild.png)](/images/2025/12/13/5-codebuild.png)

[![codebuild deployment](/images/2025/12/13/6-codebuild.png)](/images/2025/12/13/6-codebuild.png)

[![codebuild deployment](/images/2025/12/13/7-codebuild.png)](/images/2025/12/13/7-codebuild.png)

[![codebuild deployment](/images/2025/12/13/8-codebuild.png)](/images/2025/12/13/8-codebuild.png)

The GitHub Role ARN deployed by the OIDC stack needs to be an Actions Repository Secret for account assumption.

[https://github.com/jblukach/domains/blob/main/domains/domains_stack.py](https://github.com/jblukach/domains/blob/main/domains/domains_stack.py)

[![github action secrets](/images/2025/12/13/9-codebuild.png)](/images/2025/12/13/9-codebuild.png)

[![github action secrets](/images/2025/12/13/10-codebuild.png)](/images/2025/12/13/10-codebuild.png)

I am now ready to add a GitHub Action to support my Continuous Deployment goal!

[https://github.com/jblukach/domains/blob/main/.github/workflows/domains.yaml](https://github.com/jblukach/domains/blob/main/.github/workflows/domains.yaml)

```yaml
name: domains
on:
  push:
    branches:
      - main
  schedule:
    - cron:  '0 2 1 * *'
jobs:
  deploy:
    runs-on:
      - codebuild-domains-${{ github.run_id }}-${{ github.run_attempt }}
    permissions:
      id-token: write
      contents: read
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v5
        with:
          node-version: '22'
      - uses: aws-actions/configure-aws-credentials@v5
        with:
          role-to-assume: ${{ secrets.ROLE }}
          aws-region: us-east-1
      - run: npm install -g aws-cdk
      - run: npm install -g aws-cdk-lib
      - run: python -m pip install --upgrade pip
      - run: pip install -r requirements.txt --upgrade
      - run: cdk deploy --all --require-approval never
```
