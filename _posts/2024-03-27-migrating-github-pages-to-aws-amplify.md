---
layout: post
title: "4n6irBlog #33 - Migrating GitHub Pages to AWS Amplify"
author: "John Lukach"
tags: aws amplify github pages blog jekyll
---

Occasionally, I get an itch to learn front-end development as I wanted to try the Public Preview of AWS Amplify Gen 2 for fun.

I moved the Forensic Incident Response (4n6ir) Blog to the original AWS Amplify from GitHub Pages, where Jekyll generated a static website.

GitHub Pages uses an older version of Jekyll, and I wanted to start using the latest version built on Amazon Linux 2023 with reduced complexity around the Amazon CloudFront deployment.

However, the AWS Amplify documentation was sparse on the required build settings, so I could not get it to work the last time I tried. This time, I got it to work successfully with these settings!

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - gem install "jekyll-theme-minimal"
        - gem install "jekyll-feed"
        - gem install "jekyll-paginate"
    build:
      commands:
        - jekyll b
  artifacts:
    baseDirectory: _site
    files:
      - '**/*'
  cache:
    paths: []
```