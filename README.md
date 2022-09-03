# n8n-nodes-n8n-api

A n8n node that allows you to create workflows using the [n8n API](https://docs.n8n.io/api/).

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

### Credential

#### Create

Allows you to create credentials.

Required fields:

- Name: name of the credential, eg. `John's GitHub Token`
- Credential Type Name: Type of the credential, eg. `githubApi`
- Data: JSON data for the credential, eg.
```json
{
	"server": "https://api.github.com",
	"user": "octocat",
	"accessToken": "octoCat'sTOKEN"
}
```


#### Delete

Allows you to delete existing credentials

Required fields:

- ID: ID of the credential, eg. `17`

#### Get

Allows you to get the credential based on the type.

Required fields:

- Credential Type Name: Type of the credential, eg. `githubApi`

### Execution

#### Delete

Allows you to delete an execution

Required fields:
- ID: ID of the execution, eg. `17`

#### Get

Allows you to get data of an execution

Required fields:
- ID: ID of the execution, eg. `17`

#### Get All

Fetches all the executions

### Workflow

#### Activate

Allows you to activate a workflow

Required fields:
- ID: ID of the workflow, eg. `17`

#### Create

Allows you to create a workflow

Required fields:

- Name: Name of the new workflow, eg. `My New Workflow`
- Nodes: Array of the nodes, eg.
```json
[
  {
    "parameters": {},
    "id": "1cce408f-3b10-407b-bb67-59f9df17e07a",
    "name": "Start",
    "type": "n8n-nodes-base.start",
    "typeVersion": 1,
    "position": [
      240,
      300
    ]
  },
  {
    "parameters": {
      "operation": "get",
      "id": 374
    },
    "id": "85caf357-28d6-4497-bc5d-2b14519e4c6d",
    "name": "n8n node",
    "type": "n8n-nodes-n8n-api.N8nApi",
    "typeVersion": 1,
    "position": [
      460,
      300
    ],
    "credentials": {
      "n8nApi": {
        "id": "325",
        "name": "n8n node account 2"
      }
    }
  },
  {
    "parameters": {
      "operation": "create",
      "name": "Test Workflow 1",
      "nodes": "={{ $json[\"nodes\"] }}",
      "connections": "={{ $json[\"connections\"] }}",
      "workflowSettingsUi": {
        "settings": {
          "saveExecutionProgress": true,
          "saveManualExecutions": true
        }
      }
    },
    "id": "4400dc2f-3a9c-4f8b-a0e0-ce69e126c7e6",
    "name": "n8n node1",
    "type": "n8n-nodes-n8n-api.N8nApi",
    "typeVersion": 1,
    "position": [
      700,
      300
    ],
    "credentials": {
      "n8nApi": {
        "id": "325",
        "name": "n8n node account 2"
      }
    }
  },
  {
    "parameters": {
      "resource": "credential",
      "operation": "create",
      "name": "Test Credential",
      "credentialTypeName": "slackApi",
      "data": "{\n\"accessToken\":\"askdjfladjkflka\"\n}"
    },
    "id": "58410204-c252-42d4-9bc3-cee2e413dbfa",
    "name": "n8n node2",
    "type": "n8n-nodes-n8n-api.N8nApi",
    "typeVersion": 1,
    "position": [
      460,
      480
    ],
    "credentials": {
      "n8nApi": {
        "id": "325",
        "name": "n8n node account 2"
      }
    }
  }
]
```
- Connections: Connection data for the nodes, eg.
```json
{
  "Start": {
    "main": [
      [
        {
          "node": "n8n node",
          "type": "main",
          "index": 0
        }
      ]
    ]
  },
  "n8n node": {
    "main": [
      [
        {
          "node": "n8n node1",
          "type": "main",
          "index": 0
        }
      ]
    ]
  }
}
```

- Workflow Settings: Settings for the workflow

#### Deactivate

Allows you to deactivate a workflow

Required fields:
- ID: ID of the workflow, eg. `17`

#### Delete

Allows you to delete a workflow

Required fields:
- ID: ID of the workflow, eg. `17`

#### Get

Allows you to fetch data of a workflow

Required fields:
- ID: ID of the workflow, eg. `17`

### Get All

Allows you to fetch all the workflows

#### Update

Allows you to update a workflow

Required fields:
- ID: ID of the workflow, eg. `17`

**NOTE:** Rest of the fields same as the create operation

## Credentials

For authentication, n8n API Key is required. Follow the instructions mentioned in the [documentation](https://docs.n8n.io/api/authentication/) to generate the API key.

## Contribute

Open up a new [issue](https://github.com/harshil1712/n8n-nodes-n8n-api/issues/new) to report any bugs or for feature request.

You're encouraged to submit pull requests!

## License

[MIT](./LICENSE.md)
