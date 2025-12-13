---
layout: post
title: "Migrated #21 - AArch64 Memory Acquisition for Linux"
author: "John Lukach"
tags: AArch64 arm64 Linux Memory Acquisition
---

I have been happy with AVML (Acquire Volatile Memory for Linux) from Microsoft for acquiring memory from **x86_64** Linux systems.

[https://github.com/microsoft/avml](https://github.com/microsoft/avml)

With most of my workloads running on **arm64** now, I was excited to see the return of DumpIt for Linux under the Magnet Forensics banner.

[https://github.com/MagnetForensics/dumpit-linux](https://github.com/MagnetForensics/dumpit-linux)

The provided directions focus on Ubuntu, where my primary server operating system is Amazon Linux, so I wanted to share my notes.

##### Installation

1. ```yum install xz-devel```
2. ```curl https://sh.rustup.rs -sSf | sh -s -- -y```
3. ```source "$HOME/.cargo/env"```
4. ```git clone git@github.com:MagnetForensics/dumpit-linux.git```
5. ```cd dumpit-linux```
6. ```cargo build --release```
7. ```cd target/release```
8. ```./dumpitforlinux -h```

```
DumpIt (For Linux - x64 & ARM64) 0.1.0 (2023-01-27T13:42:56Z)
Linux memory acquisition that makes sense.
Copyright (c) 2022, Magnet Forensics, Inc.

A program that makes memory analysis for incident response easy, scalable and practical

Usage: dumpitforlinux [OPTIONS] [Output Path]

Arguments:
  [Output Path]  Path to the output archive or file

Options:
  -0, --to-stdout  Write to stdout instead of a file
  -r, --raw        Create a single core dump file instead of a compressed archive
  -v, --verbose    Print extra output while parsing
  -h, --help       Print help information
  -V, --version    Print version information
```
