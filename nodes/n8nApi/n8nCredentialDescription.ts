import { INodeProperties } from 'n8n-workflow';

export const n8nCredentialDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: 'createCredential',
		displayOptions: {
			show: {
				resource: ['credential'],
			},
		},
		options: [
			{
				name: 'Create Credential',
				value: 'createCredential',
				action: 'Create credential',
			},
			{
				name: 'Delete Credential',
				value: 'deleteCredential',
				action: 'Delete credential',
			},
			{
				name: 'Get Credential Schema',
				value: 'getCredentialSchema',
				action: 'Get credential schema',
			},
		],
	},
];

const getAllOperation: INodeProperties[] = [
	{
		displayName: 'Object',
		name: 'object',
		type: 'json',
		default: '',
		placeholder: '{ "name": "", "type": "", "data": { "token": "" } }',
		description: 'Object with credential to be add',
		typeOptions: {
			alwaysOpenEditWindow: true,
		},
		displayOptions: {
			show: {
				'/operation': ['createCredential'],
			},
		},
	},
	{
		displayName: 'Schema Name',
		name: 'schemaName',
		type: 'string',
		default: '',
		placeholder: 'freshdeskApi',
		description: 'Name of the schema to use',
		displayOptions: {
			show: {
				'/operation': ['getCredentialSchema'],
			},
		},
	},
];

export const n8nCredentialFields: INodeProperties[] = [...getAllOperation];
