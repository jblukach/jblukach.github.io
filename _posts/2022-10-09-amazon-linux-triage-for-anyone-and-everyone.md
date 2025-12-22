---
layout: post
title: "4n6ir #13 - Amazon Linux Triage for Anyone and Everyone"
author: "John Lukach"
tags: Amazon AWS Linux Meta SHA256
---

Amazon Linux default installation now starts with about **150,000** directories and files. How do we know which files belong on a particular host during the triage of the operating system?

Review enough systems; you start remembering all those Amazon Linux operating system artifacts. Just in time for new directories and filenames to be added to the mix or moved to other locations.

![MMI-Command-Output](/images/2022/10/MMI-Output.jpg)

The ```mmi``` command line tool lists the current path's directories and files based on user access permission, which are color-coded to help reduce triage time.

- Empty File (purple)
- Known File (green)
- Known Meta (blue)
- Large File (red)
- Partial Meta (grey)
- Unknown (black)

If you want to try it out --> [https://github.com/jblukach/mmi](https://github.com/jblukach/mmi)

This capability is only as good as the data provided; thus, I have an RSS Feed tracking the current status of the artifacts with links to supporting Open Source software that handles the automatic updates.

[https://static.matchmeta.info/amazonami.json](https://static.matchmeta.info/amazonami.json)
