---
layout: post
title: "4n6ir #16 - Amazon Linux Triage Update"
author: "John Lukach"
tags: Amazon AWS Linux Meta SHA256
---

![MatchMeta.Info](/images/2023/02/MMI.png)

Released lucky number version **13** recently to help anyone and everyone triage their Amazon Linux, Amazon Linux 2, and Amazon Linux 2022 installations for ```x86_64``` and ```arm64``` architectures.

[https://github.com/jblukach/mmi](https://github.com/jblukach/mmi)

The corpus includes 288 images from us-west-2, a.k.a. Oregon, with a correlation to 27 regions for potentially 7,776 Amazon Machine Image (AMI) coverage.

[https://static.matchmeta.info/amazonami.json](https://static.matchmeta.info/amazonami.json)

### New Dection

GTFOBins is a curated list of Unix binaries that can bypass local security restrictions in misconfigured systems.

[https://gtfobins.github.io](https://gtfobins.github.io)

Identification occurs using SHA256 Hash, Full Path, and File Name matches from the efficient bloom filter storage.

### By The Numbers

- 57,913,308 total SHA256 hashes
- 5,358,570 unique SHA256 hashes

- 964,155 total GTFOBin hashes
- 39,470 unique GTFOBin hashes

### What's Next

I recently removed the Python ```os``` library dependency that opens the door for potentially releasing my Microsoft Windows data set at some point.

[https://github.com/4n6ir/getmeta](https://github.com/4n6ir/getmeta)
