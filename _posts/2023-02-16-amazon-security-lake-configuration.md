---
layout: post
title: "Migrated #19 - Amazon Security Lake Configuration"
author: "John Lukach"
tags: Amazon Security Lake Cloud Trail Route53 VPC Hub
---

I am always looking for an opportunity to make logging easier for collection, retention, and usability. I have been happy with Cloud Trail Lake, but I figured it would be fun to try the beta of Security Lake. Let's get started by delegating administration from the management account to another account.   

![1-security-lake-get-started.png](/images/2023/02/1-security-lake-get-started.png)

Security Lake collects and normalizes Cloud Trail, Route53 Query, Security Hub Findings, and VPC Flow logs without configuration. If I need Cloud Trail Data events or AWS Config logs, I will still be using Cloud Trail Lake. Both recently released a new feature with the ability to import records from external sources.

![2-security-lake-event-sources.png](/images/2023/02/2-security-lake-event-sources.png)

Security Lake does not support all regions currently compared to the Cloud Trail Lake capability. 

![3-security-lake-selected-regions.png](/images/2023/02/3-security-lake-selected-regions.png)

Only AES encryption is supported, keeping encryption management straightforward while missing out on the benefits of KMS.

![4-security-lake-iam-encryption.png](/images/2023/02/4-security-lake-iam-encryption.png)

I have provided the CDK code written in Python for the required IAM role.

```python

        account = Stack.of(self).account

        role = _iam.Role(
            self, 'role',
            role_name = 'AmazonSecurityLakeMetaStoreManager',
            assumed_by = _iam.CompositePrincipal(
                _iam.ServicePrincipal('lambda.amazonaws.com'),
                _iam.ServicePrincipal('securitylake.amazonaws.com')
            )
        )

        role.add_to_policy(
            _iam.PolicyStatement(
                actions = [
                    'logs:CreateLogStream',
                    'logs:PutLogEvents'
                ],
                resources = [
                    'arn:aws:logs:*:*:log-group:/aws/lambda-insights:*'
                ]
            )
        )

        role.add_to_policy(
            _iam.PolicyStatement(
                actions = [
                    'logs:CreateLogGroup'
                ],
                resources = [
                    '*'
                ]
            )
        )

        role.add_to_policy(
            _iam.PolicyStatement(
                actions = [
                    'logs:CreateLogGroup'
                ],
                resources = [
                    'arn:aws:logs:*:*:*'
                ]
            )
        )

        role.add_to_policy(
            _iam.PolicyStatement(
                actions = [
                    'logs:CreateLogStream',
                    'logs:PutLogEvents'
                ],
                resources = [
                    'arn:aws:logs:*:*:log-group:/aws/lambda/*'
                ]
            )
        )

        role.add_to_policy(
            _iam.PolicyStatement(
                actions = [
                    'glue:CreatePartition',
                    'glue:CreatePartitionIndex',
                    'glue:GetPartition',
                    'glue:GetPartitionIndexes',
                    'glue:GetPartitions',
                    'glue:UpdateTable',
                    'glue:GetTable',
                    'glue:GetDatabase',
                    'glue:CreateDatabase',
                    'glue:CreateTable',
                    'glue:GetTables',
                    'glue:BatchCreatePartition'
                ],
                resources = [
                    'arn:aws:glue:*:*:table/amazon_security_lake_glue_db*/*',
                    'arn:aws:glue:*:*:database/amazon_security_lake_glue_db*',
                    'arn:aws:glue:*:*:catalog',
                    'arn:aws:glue:*:*:database/default'
                ]
            )
        )

        role.add_to_policy(
            _iam.PolicyStatement(
                actions = [
                    'sqs:ReceiveMessage',
                    'sqs:DeleteMessage',
                    'sqs:GetQueueAttributes'
                ],
                resources = [
                    'arn:aws:sqs:*:'+account+':*'
                ]
            )
        )

```

Security Lake uses delegated administration permissions from the AWS Organization, ensuring logs from all accounts.

![5-security-lake-selected-accounts.png](/images/2023/02/5-security-lake-selected-accounts.png)

Short-term log retention requirements will benefit from the Security Lake cost model, where long-term centralization and retention management are easier on Cloud Trail Lake.  

![6-security-lake-rollup-region.png](/images/2023/02/6-security-lake-rollup-region.png)

Security Lake requires an IAM role per roll-up region for log centralization provided in CDK code written with Python.

```python

        region = Stack.of(self).region

        use1role = _iam.Role(
            self, 'use1role',
            role_name = 'SecurityLakeRollupUSE1',
            assumed_by = _iam.CompositePrincipal(
                _iam.ServicePrincipal('s3.amazonaws.com')
            )
        )

        use1role.add_to_policy(
            _iam.PolicyStatement(
                actions = [
                    's3:ListBucket',
                    's3:GetReplicationConfiguration',
                    's3:GetObjectVersionForReplication',
                    's3:GetObjectVersion',
                    's3:GetObjectVersionAcl',
                    's3:GetObjectVersionTagging',
                    's3:GetObjectRetention',
                    's3:GetObjectLegalHold'
                ],
                resources = [ # SOURCE
                    'arn:aws:s3:::aws-security-data-lake-us-east-1*',
                    'arn:aws:s3:::aws-security-data-lake-us-east-1*/*'
                ]
            )
        )

        use1role.add_to_policy(
            _iam.PolicyStatement(
                actions = [
                    's3:ReplicateObject',
                    's3:ReplicateDelete',
                    's3:ReplicateTags',
                    's3:GetObjectVersionTagging'
                ],
                resources = [ # DESTINATION
                    'arn:aws:s3:::aws-security-data-lake-'+region+'*/*'
                ]
            )
        )

```

Security Lake uses S3 Life-Cycle policies to manage the retention policies.

![7-security-lake-storage-classes.png](/images/2023/02/7-security-lake-storage-classes.png)

Grant administration access inside Lake Formation to Security Lake for the current IAM access role.

![8-security-lake-administrator.png](/images/2023/02/8-security-lake-administrator.png)

Provide access to the Security Lake data from within Lake Formation for the current IAM access role.

![9-security-lake-data-permissions.png](/images/2023/02/9-security-lake-data-permissions.png)

If Athena returns blank search results but says it is successful, Security Lake did not enable the Lambda Trigger for the SQS queue.

![10-security-lake-lambda-trigger.png](/images/2023/02/10-security-lake-lambda-trigger.png)

Disabling Security Lake still requires manual resource clean-up before re-enabling.
