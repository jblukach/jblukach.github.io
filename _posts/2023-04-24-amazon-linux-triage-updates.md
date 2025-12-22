---
layout: post
title: "4n6ir #23 - Amazon Linux Triage Updates"
author: "John Lukach"
tags: Amazon AWS Linux Meta SHA256
---

### Sustainability

I needed a way to automate the updating and distribution of the bloom filter used by the project. The first step was reducing the GitHub repository size using the BFG Repo-Cleaner to remove the bloom filters.

[https://rtyley.github.io/bfg-repo-cleaner/](https://rtyley.github.io/bfg-repo-cleaner/)

Next was shrinking the package size distributed by the Python Package Index (PyPI) using a content delivery network to host the bloom filters.

**Links**

[https://static.matchmeta.info/mmi.bloom](https://static.matchmeta.info/mmi.bloom)

[https://static.matchmeta.info/gtfo.bloom](https://static.matchmeta.info/gtfo.bloom)

**Verify**

[https://static.matchmeta.info/mmi.sha256](https://static.matchmeta.info/mmi.sha256)

[https://static.matchmeta.info/gtfo.sha256](https://static.matchmeta.info/gtfo.sha256)

Finally, I removed the likelihood test for now from the bundle to keep the volume down, allowing the application to check if a new version is available automatically.

### Performance

If you haven't checked out the BLAKE3 cryptographic hash function, it is worth it for the performance improvements.

[https://github.com/BLAKE3-team/BLAKE3](https://github.com/BLAKE3-team/BLAKE3)

Once the Rust programming language is more readily available on the default Amazon Linux operating system installation, I will switch over as ready for the future.

If you want to try it out --> [https://github.com/jblukach/mmi](https://github.com/jblukach/mmi)
