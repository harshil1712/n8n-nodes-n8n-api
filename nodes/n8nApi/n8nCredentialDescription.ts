import { INodeProperties } from 'n8n-workflow';

export const n8nCredentialDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: 'get',
		displayOptions: {
			show: {
				resource: ['credential'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a credential',
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a credential',
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a credential',
			},
		],
	},
];

const credentialOperationFields: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
		default: '',
		description: 'Name of the new credential',
		required: true,
		type: 'string',
		displayOptions: {
			show: {
				resource: ['credential'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Credential Type Name',
		name: 'credentialTypeName',
		default: '',
		required: true,
		type: 'string',
		displayOptions: {
			show: {
				resource: ['credential'],
				operation: ['get', 'create'],
			},
		},
	},
	{
		displayName: 'ID',
		name: 'id',
		default: '',
		description: 'The credential ID that needs to be deleted',
		required: true,
		type: 'number',
		displayOptions: {
			show: {
				resource: ['credential'],
				operation: ['delete'],
			},
		},
	},
	{
		displayName: 'Data',
		name: 'data',
		default: '',
		description: 'JSON data of the credential to be created',
		required: true,
		type: 'string',
		displayOptions: {
			show: {
				resource: ['credential'],
				operation: ['create'],
			},
		},
	},
];

export const n8nCredentialFields: INodeProperties[] = [...credentialOperationFields];
