---
layout: post
title: "4n6ir #25 - Amazon SageMaker Jupyter Notebooks"
author: "John Lukach"
tags: AWS Amazon SageMaker Jupyter Notebooks
---

Jupyter Notebook end-users only need part of the development environment that AWS Cloud9 or GitHub Codespaces provide. The security operations center (SOC) executes the automation to collect the artifacts to move on quickly, making Amazon SageMaker a good alternative.

Setup access to the public GitHub repository where the Jupyter Notebooks are maintained. GitHub has a fine-grained personal access token (PAT) option allowing storage in AWS Secrets Manager that supports the least privileged usage of private repositories.
    
[![github-repository](/images/2023/08/1-github-repository.png)](/images/2023/08/1-github-repository.png)

Creating an Identity Access Management (IAM) role will occur while making the first notebook instance. I will use different permissions sets dependent on the resources accessed, but this will minimally get you started just to run Jupyter Notebooks.

[![default-iam-role](/images/2023/08/2-default-iam-role.png)](/images/2023/08/2-default-iam-role.png)

[![iam-permissions](/images/2023/08/3-iam-permissions.png)](/images/2023/08/3-iam-permissions.png)

Remember, when creating the notebook instance, the requirements for testing are much different than running in production.

[![create-notebook](/images/2023/08/4-create-notebook.png)](/images/2023/08/4-create-notebook.png)

[![grant-permissions](/images/2023/08/5-grant-permissions.png)](/images/2023/08/5-grant-permissions.png)

[![repositories-access](/images/2023/08/6-repositories-access.png)](/images/2023/08/6-repositories-access.png)

End-users should not have root access, as the lifecycle configuration provides a way to configure the systems without granting this level of permission.

Please attach the notebook instance to a VPC, so it is not on the public Internet, and always use tags.

Watch out for the Jupyter Notebook instances that get left running, as they will not shut off after a period of inactivity hitting the cloud spend.
