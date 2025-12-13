---
layout: post
title: "Migrated #14 - Using AWS Cloud9 as a Bastion Host"
author: "John Lukach"
tags: Amazon AWS Bastion CDK Cloud9 Linux
---

![1-AWS-Cloud9-IDE](/images/2022/10/1-AWS-Cloud9-IDE.png)

I originally wrote a blog post about getting rid of my local development environment that used AWS Cloud Development Kit (CDK) in October 2020. I figured it was time to provide an updated configuration on using AWS CLoud9 as a Bastion Host.

![2-Name-Environment](/images/2022/10/2-Name-Environment.png)

Create a no-ingress EC2 instance for simplified environment access via System Manager using a t3.small running Amazon Linux 2 with a thirty-minute timeout.

![3-Configure-Settings-One](/images/2022/10/3-Configure-Settings-One.png)

Another benefit of using Cloud9 is it takes care of the Identity Access Management (IAM) and Network connectivity to my cloud environment.

![4-Configure-Settings-Two](/images/2022/10/4-Configure-Settings-Two.png)

All set to create the bastion host!

![5-Create-Environment](/images/2022/10/5-Create-Environment.png)

Cloud Development Kit (CDK) typically has regular weekly updates.

```
$ npm install -g aws-cdk
npm ERR! code EEXIST
npm ERR! path /home/ec2-user/.nvm/versions/node/v16.17.1/bin/cdk
npm ERR! EEXIST: file already exists
npm ERR! File exists: /home/ec2-user/.nvm/versions/node/v16.17.1/bin/cdk
npm ERR! Remove the existing file and try again, or run npm
npm ERR! with --force to overwrite files recklessly.

npm ERR! A complete log of this run can be found in:
npm ERR!     /home/ec2-user/.npm/_logs/2022-10-15T12_22_05_246Z-debug-0.log
```

Occasionally the NPM update needs to be forced on a fresh install.

```
$ npm install -g aws-cdk --force
npm WARN using --force Recommended protections disabled.

added 1 package, and audited 2 packages in 1s

found 0 vulnerabilities
```

SSH Keys will be used for access to GitHub for source code management.

```
$ ssh-keygen -t rsa
$ cat ~/.ssh/id_rsa.pub
$ eval $(ssh-agent -s)
$ ssh-add ~/.ssh/id_rsa
```

![6-GitHub-SSH-Keys](/images/2022/10/6-GitHub-SSH-Keys.png)

Author setup is required, so pull requests show up as the GitHub user, not the EC2 device.

```
$ git config --global user.name "John Lukach"
$ git config --global user.email <GitHub Email>
$ git commit --amend --reset-author
```

![7-GitHub-Privacy-Email](/images/2022/10/7-GitHub-Privacy-Email.png)

Lastly, Cloud9 leaves temporary files ```.~c9``` if it has issues that we do not want merged.

```
$ echo .~c9* > ~/.gitignore
$ echo cdk.context.json >> ~/.gitignore
$ git config --global core.excludesfile ~/.gitignore
```
