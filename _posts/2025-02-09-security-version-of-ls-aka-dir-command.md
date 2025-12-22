---
layout: post
title: "4n6ir #46 - Security version of “ls” a.k.a. “dir” command"
author: "John Lukach"
tags: artifacts blake3 gtfobins lolbas loobins mmi poppy
---

The ```mmi``` command line interface (CLI) allows anyone and everyone to triage an operating system (OS) with color-coded output.

- **BLUE** Known Meta Text
- **GREEN** Known File Content
- **RED** Potentially Suspect

![mmi cli output](/images/2025/02/cli.jpg)

Blake3 (B3) hashes of the file content, directory name, file name, and full path are automatically collected when the EC2 Image Builder pipeline executes the ```getmeta``` command.

Artifacts, including the following operating systems, are published weekly as a Poppy Bloom filter.

- Amazon Linux 2
- Amazon Linux 2023
- Apple macOS Ventura
- Apple macOS Sonoma
- Apple macOS Sequoia
- Canonical Ubuntu 18
- Canonical Ubuntu 20
- Canonical Ubuntu 22
- Canonical Ubuntu 24
- Microsoft Windows 2016
- Microsoft Windows 2019
- Microsoft Windows 2022
- Microsoft Windows 2025

Capturing the Macintosh artifacts was an adventure with Amazon EC2 Dedicated Hosts, which cost **$15.60** daily for the ```mac2``` instance type. The collection will remain manual at that price point as new Amazon Machine Images (AMIs) are released. At least a single dedicated host can be used for multiple OS installations as a waiting game for the next launch after instance termination.

Additional file content classifications are available when a B3 hash is not displayed.

- **DENIED** Permission Issue
- **DIRECTORY** Folder Path
- **EMPTY** Empty File Hash
- **ERROR** Content Hash Error
- **LARGE** File Size 1+ GB
- **ZERO** Zero File Size

Legitimate files found on default OS installations that threat actors can potentially use to perform malicious intent are flagged; this technique is known as living off the land (LOL).

- [https://gtfobins.github.io](https://gtfobins.github.io)
- [https://lolbas-project.github.io](https://lolbas-project.github.io)
- [https://www.loobins.io](https://www.loobins.io)

Code was migrated from Python to Rust; a crate is available to install the binary.

- [https://crates.io/crates/mmi](https://crates.io/crates/mmi)
