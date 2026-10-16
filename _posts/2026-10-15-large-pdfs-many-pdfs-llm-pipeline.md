---
layout: post
title: "Builder #3 - Large PDFs, Many PDFs: LLM Pipeline"
author: "John Lukach"
tags: aws bedrock lambda llm pdf pipeline
---

Shorter study notes are not much use if they leave out the default setting, the service limit, or the exception that changes an answer.

I built [jblukach/scs](https://github.com/jblukach/scs) to condense official AWS documentation while keeping those details. It collects PDFs relevant to the AWS Certified Security - Specialty exam and uses Amazon Nova 2 Lite through Amazon Bedrock to edit them into Markdown study notes. The prompt produces general AWS certification notes rather than filtering for one exam.

The model handles the editing. The rest of the project handles getting large documents into it, tracking work across a collection, and putting the results back together.

## Two Different Size Problems

A large PDF can exceed a conversion function's memory or timeout before the model sees it. A large collection creates a different problem: scheduling requests, knowing what finished, and recovering what failed without starting over.

The pipeline handles preparation and inference separately:

```text
Manifest -> scs-download -> Study bucket
                                |
                          manual staging
                                v
PDF bucket -> pdf2md -> Markdown bucket
                                |
                        text2chunk (manual)
                                v
                           Chunk bucket
                                |
                        chunk2read (manual)
                         /              \
                   Read bucket      FLEX bucket
                        |                |
                  Bedrock batch    Converse FLEX
                         \              /
                           Nova bucket
                                |
                          output (manual)
                                v
                            Out bucket

Large-PDF preparation, before conversion:
Raw bucket -> raw2split -> Split bucket
Split bucket --manual copy--> PDF bucket
```

This is not an unattended chain. Downloading, chunking, staging inference inputs, and assembling outputs each require a manual invocation. Conversion and splitting react to PDF uploads; inference runs asynchronously after chunks reach the read or FLEX bucket. S3 holds the intermediate files, so each stage can be inspected before moving on.

## Getting the PDFs Into Shape

The downloader saves the PDFs listed in its manifest to the study bucket. Copying a document to the PDF bucket then invokes `pdf2md`, which uses `pymupdf4llm` to extract Markdown. The model receives that text later, not the original PDF.

Larger documents can go through the raw bucket first. `raw2split` uses PyMuPDF to produce numbered parts of at most **1,000 pages**. Those parts then need copying to the PDF bucket; the split bucket does not trigger conversion itself.

Splitting gives each conversion fewer pages to handle, not a guarantee of success. A complex 1,000-page part can still exceed memory or the 15-minute Lambda timeout.

The split stage drops folder prefixes, so PDFs with the same filename in different folders can overwrite each other's parts. The chunker also uses the source basename for output keys. Use distinct filenames throughout the collection.

## Keeping the Chunks Readable

`text2chunk` scans the Markdown bucket when invoked manually and processes up to eight files concurrently.

It starts with H1 and H2 sections, packing short sections together using a **15,000-character** limit. Sections that are too large are split at deeper headings, then paragraphs and lines. Character splitting is the last fallback.

Tables and fenced code blocks stay together when they fit; oversized ones can still be split. Continuation chunks repeat the section's first heading, and saved files include source, document, section, and chunk-number metadata where available. These additions happen after splitting, so the final file can exceed 15,000 characters.

The limit counts characters, not tokens. The inference worker separately rejects source chunks larger than 100,000 UTF-8 bytes.

Smaller requests mean less content to reprocess after a failed edit. They also leave room for the response: a large input context window does not mean the model can return an equally large output.

Each chunk is edited independently. The pipeline does not ask the model to reconcile the whole document or synthesize findings across documents.

## What the Model Should Keep

The [editing prompt](https://github.com/jblukach/scs/blob/main/read2nova/read2nova.py) asks the model to retain concepts, workflows, configuration choices, defaults, limits, security behavior, and trade-offs stated in the source. Console navigation, marketing language, and repetition can go. Exact service names, API actions, parameters, and values must stay, with no external facts or unsupported exam advice added.

Each substantive edit should preserve its provenance lines and follow a consistent layout: an H3 topic title, a short overview, key concepts, configuration and trade-off sections where supported, and a final key-takeaway callout. Nontechnical chunks get a study-relevance marker instead.

Those are instructions, not guarantees. The validator checks formatting, not whether every required section is present or every fact survived the edit. Review representative results for omissions, changed meaning, and lost qualifications before using them to study.

The worker requires an `end_turn` stop reason. It rejects empty Markdown, H1/H2 headings outside code fences, ambiguous setext-style heading underlines, and unclosed code fences. A recognized outer Markdown wrapper can be removed before validation; incomplete or ambiguous wrappers remain errors.

`NovaMaxOutputTokens` defaults to 16,000. A response that reports stopping at the token limit is rejected rather than saved as a finished edit. An accepted response larger than 80% of its source in UTF-8 bytes gets a `LowCondensation` warning but is still saved. That ratio helps flag weak condensation; it cannot tell whether the right information was kept.

## Batch for Volume, FLEX for Small Sets

The manually invoked `chunk2read` function skips keys already present in the Nova result bucket. It copies the remaining chunks in complete groups of **100 files** to the read bucket for batch inference, sending the last **0-99 files** to FLEX.

With 237 unfinished chunks, for example, 200 go to the read bucket and 37 go to FLEX. The inference coordinator decides how to submit the read-bucket work, so two groups copied to S3 do not necessarily mean two Bedrock jobs.

Those copies are not transactional. If staging fails partway through, completed copies remain, potentially leaving an incomplete read group. Check pending work before rerunning: chunks already staged but without a Nova result are still eligible to be copied again.

FLEX also makes it possible to test a few chunks without filling a batch. Both paths use the same prompt and validation and save successful edits under the source key in the Nova bucket. They are separate billable inference modes, though: a good FLEX result does not verify batch permissions or execution. Test a representative batch of at least 100 files before processing the collection.

## Keeping Track of the Work

SQS carries source notifications to the worker, which prepares the input and registers the upload event in DynamoDB before acknowledging the message. Registered batch work no longer depends on that queue message remaining available. S3 holds prepared inputs, batch inputs, raw results, and manifests. EventBridge triggers dispatch and reconciliation every five minutes and reports terminal batch-job states.

The coordinator runs with **reserved concurrency of one**. Its job ownership and quota accounting depend on that single worker, so increasing Lambda concurrency is not a supported way to speed it up. Batch parallelism is controlled through `NovaActiveJobs`, which defaults to two active jobs, within the account's available quota.

FLEX requests use a persistent rolling-minute quota ledger. The default request and token budgets apply to FLEX, not batch jobs. Because FLEX and batch share the coordinator's execution slot, a long FLEX call can delay batch coordination.

Recovery depends on where the failure happened. A source preparation failure retries through SQS and eventually reaches the source dead-letter queue. A batch model error or invalid result stays in DynamoDB as a failed chunk; its ID can be retried after the job's results have been collected.

FLEX has its own source queue and dead-letter recovery path. Failed asynchronous invocations and EventBridge deliveries go to a separate workflow failure queue. Recover the failed stage rather than reuploading the whole collection and potentially paying to process successful chunks again.

## Putting the Documents Back Together

After inference finishes, the manually invoked `output` function compares Markdown keys in the chunk and Nova buckets. Missing or unexpected results stop assembly, so unrelated FLEX test results cannot be left in the production Nova inventory.

The function groups chunks by original document, checks numbered positions, and concatenates them in PDF-part and chunk order. Gaps, duplicate positions, and unrecognized names are errors. The result is one Markdown file per original document, not another LLM synthesis pass.

The chunk bucket is the reference inventory, not an independent manifest of the original PDFs. A document or trailing chunk absent from both buckets can escape these checks. Verify that conversion and chunking finished before treating the collection as complete.

Matching keys do not prove freshness either. Staging skips keys already in Nova, and the buckets do not retain object versions. Use immutable source keys and plan reruns explicitly; an existing result may reflect an older source or prompt.

## A Run Through the Pipeline

After invoking `scs-download`, stage the PDFs for conversion, taking the raw/split route where needed. Once conversion finishes, invoke `text2chunk`. Copy representative chunks to FLEX, inspect the edits, and test the batch path before staging the remaining work with `chunk2read`.

These commands mark separate checkpoints. Wait for each stage's work to finish before moving on:

```bash
aws lambda invoke --function-name text2chunk \
  --region us-east-2 --profile scs chunk-response.json

aws lambda invoke --function-name chunk2read \
  --region us-east-2 --profile scs stage-response.json

# After inference completes and failures are resolved:
aws lambda invoke --function-name output \
  --region us-east-2 --profile scs output-response.json
```

The [repository README](https://github.com/jblukach/scs#readme) contains deployment prerequisites, parameters, and recovery commands. Deployment is pinned to `us-east-2` and requires Docker for the PDF-processing images, an existing dependency-layer artifact, and appropriate Bedrock model access and quotas.

## What Still Needs Watching

The queues retain messages for 14 days. DynamoDB protects registered batch work beyond that window, but it cannot recover a source notification that expired before registration. CloudWatch alarms are deployed without email or SNS actions, so notifications still need configuring or someone needs to watch the alarms.

A timed-out FLEX call can also incur another inference charge when SQS retries it. Pausing batch submission does not stop running jobs or automatic FLEX processing, and prepared inputs, raw results, and state have no automatic lifecycle cleanup. Those costs need watching even when no new batches are being submitted.

Assembly is not an atomic release of the collection. The inventory check happens first, but a later failure can leave some output documents written. Keep source and result inventories stable during assembly and check the invocation result before treating the output bucket as finished.

## Beyond This Collection

For another collection, I would start by deciding what must survive the edit. In study notes, a default value or a qualification can matter more than a whole page of explanation. A different use case will have different priorities.

The pipeline gives each chunk a path from source to edited output, with places to inspect and recover the work. Whether those outputs are worth reading still comes down to what the prompt asks for and what review catches. Getting smaller files is easy to measure. Getting useful notes takes a closer look.