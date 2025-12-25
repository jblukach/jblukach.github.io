---
layout: post
title: "4n6ir #24 - GitHub Codespaces Switch"
author: "John Lukach"
tags: GitHub Codespaces Python CDK Jupyter AWS Amazon CodeWhisperer Copilot
---

I have been a big fan of AWS Clou9 and will continue to use it as my integrated development environment (IDE) of choice for simultaneous work on multiple repositories. I have spent much more time in Amazon SageMaker lately for Jupyter Notebooks switching back when working on Cloud Development Kit (CDK) and Python projects.

Technology will always have risks; determining what you are comfortable accepting is hard. Initially, I preferred an Instance Profile for AWS access and an SSH key for GitHub. AWS IAM Identity Center (SSO) and the release of GitHub fine-grained personal access tokens (PATs) have opened other alternatives.

My goal is to work anywhere with cell service using an Apple iPad. I also wanted to use a single-user interface for the three development areas, thus running Visual Studio Code for the Web from Microsoft on GitHub Codespaces with the following setup.

[![create-codespace](/images/2023/07/1-create-codespace.png)](/images/2023/07/1-create-codespace.png)

I add the following extensions for Python development work.

[![python-development](/images/2023/07/2-python-development.png)](/images/2023/07/2-python-development.png)

Cloud Development Kit (CDK) has a few more dependencies, as ```npm install -g aws-cdk``` results in an error message when checking the installed version with the ```cdk version``` command.

```
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!                                                                                                                      !!
!!  This software has not been tested with node v20.3.0.                                                                !!
!!  Should you encounter odd runtime issues, please try using one of the supported release before filing a bug report.  !!
!!                                                                                                                      !!
!!  This software is currently running on node v20.3.0.                                                                 !!
!!  As of the current release of this software, supported node releases are:                                            !!
!!  - ^18.0.0 (Planned end-of-life: 2025-04-30)                                                                         !!
!!  - ^16.3.0 (Planned end-of-life: 2023-09-11)                                                                         !!
!!                                                                                                                      !!
!!  This warning can be silenced by setting the JSII_SILENCE_WARNING_UNTESTED_NODE_VERSION environment variable.        !!
!!                                                                                                                      !!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
```

Installing the Node requirement also returns an error message making the force option a necessity with this command: ```npm install -g node@18.0.0 --force```

```
npm ERR! code EEXIST
npm ERR! path /usr/local/share/nvm/versions/node/v20.3.0/bin/node
npm ERR! EEXIST: file already exists
npm ERR! File exists: /usr/local/share/nvm/versions/node/v20.3.0/bin/node
npm ERR! Remove the existing file and try again, or run npm
npm ERR! with --force to overwrite files recklessly.

npm ERR! A complete log of this run can be found in: /home/codespace/.npm/_logs/2023-07-11T11_25_01_965Z-debug-0.log
```

For CDK to build containers, add the Docker extension.

[![docker-install](/images/2023/07/3-docker-install.png)](/images/2023/07/3-docker-install.png)

I still use ```aqueduct``` as my helper script for AWS access with a few modifications for GitHub Codespaces.

[https://github.com/jblukach/aqueduct](https://github.com/jblukach/aqueduct)

The Jupyter extension is easy to add for notebook work too.

[![jupyter-install](/images/2023/07/4-jupyter-install.png)](/images/2023/07/4-jupyter-install.png)

I have published a Python Library to help develop Jupyter Notebooks with a few examples.

[https://github.com/botoplus/botoplus](https://github.com/botoplus/botoplus)

Writing Infrastructure as Code (IaC) for Amazon Web Services (AWS), I prefer using Amazon CodeWhisperer, which requires the AWS Toolkit extension.

[![codewhisperer-install](/images/2023/07/5-codewhisperer-install.png)](/images/2023/07/5-codewhisperer-install.png)

If I am writing Python specifically, I have started using GitHub Copilot, a pay-to-play offering requiring you to pay even more to protect your intellectual property.

[![copilot-install](/images/2023/07/6-copilot-install.png)](/images/2023/07/6-copilot-install.png)
