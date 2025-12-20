---
layout: post
title: "4n6irBlog #41 - Upgrade to the new version of ECR Basic Scanning"
author: "John Lukach"
tags: aws botoplus container ecr jupyter notebook python vulnerability
---

Last week, I woke up to an inbox full of emails from Amazon Web Services (AWS) stating that I needed to upgrade to the new version of Elastic Container Registry (ECR) basic scanning released on August 6th, 2024, before October 1st, 2025.

AWS originally released basic container scanning on October 24th, 2019, using the Open-Source Software (OSS) project Clair for static vulnerability analysis.

[https://github.com/quay/clair](https://github.com/quay/clair)

Enhanced container scanning was released on December 17th, 2021, as part of Amazon Inpsetor, an automated vulnerability management service.

Basic container scanning is one of Amazon's best **FREE** security feature.

From December 20th, 2021, to November 19th, 2023, I maintained a Cloud Development Kit (CDK) project called **scanecr** to continually scan and report on container vulnerabilities to AWS Security Hub.

I tried to reduce the code I needed to maintain my running Inspector for a while. Patching containers can be a very thankless job, and some Inspector bugs helped push me to get rid of containers in favor of AWS Lambda Layers for Python package dependencies.

I needed to update my Jupyter Notebook to triage container vulnerabilities since I have a few in my AWS environment again.

[https://github.com/jblukach/botoplus](https://github.com/jblukach/botoplus?tab=readme-ov-file#elastic-container-registry-ecr) 

Code Capabilities:

- Check the Basic Scanning Version
- Switch to Improved Basic Scanning
- Get Registry Scanning Configuration
- Put Registry Scanning Configuration
- Scan Container Images
- Container Vulnerability Summary
