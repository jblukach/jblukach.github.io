---
layout: post
title: "4n6ir #35 - Moving Security Lake Delegated Administrator"
author: "John Lukach"
tags: aws security lake delegated administrator
---

I have been shuffling my Amazon Web Services (AWS) organization to complete Control Tower environment verification with Amazon Security Lake. Typically, I would use this command when migrating to a new account, but I ran into an error.

**aws securitylake deregister-data-lake-delegated-administrator**

```
An error occurred (ResourceNotFoundException) when calling the DeregisterDataLakeDelegatedAdministrator operation: The request failed because the management account for your organization must first designate a delegated Security Lake administrator for the organization.
```

Instead, I had to use the following command to move Security Lake to another account, and I just wanted to share it in case someone else runs into this issue.

**aws organizations deregister-delegated-administrator --account-id [YOUR_ACCOUNT_ID] --service-principal securitylake.amazonaws.com**
