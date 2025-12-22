---
layout: post
title: "4n6ir #50 - Protect API Gateway with Cognito for Dynamic Content"
author: "John Lukach"
tags: aws api gateway cognito lambda
---

I am a big fan of running static site generators for my web content to reduce risk.

- [https://gohugo.io](https://gohugo.io)
- [https://jekyllrb.com](https://jekyllrb.com)

On July 10, 2014, Amazon released Cognito as a user identity and data synchronization service. With all the content generated over the years, I still found a few items that would benefit from more documentation and a working proof of concept.

- [https://github.com/jblukach/lunker](https://github.com/jblukach/lunker)

First, I hit the landing page with a link that includes the Client ID to the Managed Login provided by Cognito.

![root page](/images/2025/12/04/root-page.png)

Second, I enter the previously created email address because self-registration is not allowed in the User Pool configuration.

![hosted cognito](/images/2025/12/04/hosted-cognito.png)

Third, I enter the verification code from the email used for passwordless authentication, sent by Amazon SES.

![cognito verification](/images/2025/12/04/cognito-verification.png)

Fourth, the Managed Login redirects to the auth endpoint with a short-lived authorization code, used to retrieve the OAuth token. JavaScript is used to redirect the site on the client side using an HTTP Authorization Header.

[https://github.com/jblukach/lunker/blob/main/auth/auth.py](https://github.com/jblukach/lunker/blob/main/auth/auth.py)

### Authentication Failure

![no fishing](/images/2025/12/04/no-fishing.png)

### Authentication Success

![auth page](/images/2025/12/04/auth-page.png)

Fifth, the Lambda Authorizer validates the Bearer token to determine whether the home page is authorized to be displayed.

[https://github.com/jblukach/lunker/blob/main/authorizer/authorizer.py](https://github.com/jblukach/lunker/blob/main/authorizer/authorizer.py)

### Verification Failure

```json
{"message":"Unauthorized"}
```

### Verification Success

![home page](/images/2025/12/04/home-page.png)

I found a few bugs in the Cloud Deployment Kit (CDK) regarding logging for API Gateway and Cognito in the Python Infrastructure as Code (IaC).

Since this is just an example, I did not set up Secret Manager for the App Client Secret, as using the Lambda environment variable is not recommended.
