---
layout: post
title: "4n6ir #39 - SSO Workflow change for AWS CLI"
author: "John Lukach"
tags: aws cli sso
---

Amazon Web Services (AWS) Command Line Interface (CLI) version 2.22.0 released support for OAuth 2.0 Authorization Code Flow with PKCE on November 18th, 2024.

[https://aws.amazon.com/blogs/developer/aws-cli-adds-pkce-based-authorization-for-sso](https://aws.amazon.com/blogs/developer/aws-cli-adds-pkce-based-authorization-for-sso)

I was updating a project in GitHub Codespaces when I found the Single Sign-On (SSO) workflow changed, requiring an additional flag for OAuth 2.0 device authorization grants.

```
aws configure sso --use-device-code
```
