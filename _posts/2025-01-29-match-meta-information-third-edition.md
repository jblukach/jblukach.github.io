---
layout: post
title: "4n6ir #45 - Match Meta Information, Third Edition"
author: "John Lukach"
tags: blake3 gtfobins lolbas poppy
---

Metadata is the lowest-value indicator and is easy to circumvent. Still, with the exponential volume of directories and files standard on default operating system installations, finding things hiding in plain sight has become an important analysis technique. Traditionally, forensic analysis has only used the hash of file content that can be changed with a single-bit flip; thus, triage must be expanded to not just gold builds anymore!

![matchmeta](/images/2025/01/matchmeta.png)

### First Edition

Over a decade ago, I used my MSDN subscription to download Microsoft Windows ISOs from the Internet, including other Linux/Unix flavors. These operating systems would get spun up in VMWare Fusion and/or Hyper-V, where I ran a Python script to collect MD5, SHA1, and SHA256 hashes. Dependencies were much simpler using PyInstaller, but distribution was a significant hassle with Internet maturity. I ran my first Amazon EC2, tried different storage sites, and wrote a Twisted Python API for lookups to try and solve this limitation.

### Second Edition

Over five years ago, Internet availability had greatly improved, and using bloom filters significantly reduced data transfer requirements. The advent of cloud computing, specifically Amazon Web Services (AWS), helped automate the deployment and collection of MD5, SHA256, and BLAKE3 hashes using a Python script. While I had other operating systems, I only publicly released the Amazon Linux collection due to dependency and pipeline challenges requiring manual intervention and rising costs.

### Third Edition

Migrating to Rust from Python was the first step in resolving dependency issues from the previous edition. I shifted to only collecting BLAKE3 hashes stored in an Apache Parquet format, uploaded directly to an S3 bucket.

[https://github.com/jblukach/getmeta](https://github.com/jblukach/getmeta)

The pipeline uses EC2 Image Builder, which meets over 80% of the requirements.

[https://docs.aws.amazon.com/imagebuilder](https://docs.aws.amazon.com/imagebuilder)

Athena searches the S3 data lake of Apache Parquet files for content hashes, directories, file names, full paths, and living off-the-land binaries for GTFOBins and LOLBAS. Good security operations require validation that tools are working as expected. The documentation states that CloudTrail logs are generated for failed Athena searches that are not occurring needing extra monitoring.

[https://docs.aws.amazon.com/athena/latest/ug/monitor-with-cloudtrail.html](https://docs.aws.amazon.com/athena/latest/ug/monitor-with-cloudtrail.html)

Bloom filters are released to the GitHub artifacts repository for download weekly.

[https://github.com/jblukach/artifacts](https://github.com/jblukach/artifacts)

### Next Goal

The artifacts cover Amazon, Microsoft, and Ubuntu, but I need Apple Macintosh support next! The problem is expense: ```mac2``` costs **$0.65** per hour, and a minimum of 24 hours is required.  I have made the raw data available as donationware if you want to support the initiative. Please feel free to reach out with any feedback or improvements you would like to see added - thanks!
