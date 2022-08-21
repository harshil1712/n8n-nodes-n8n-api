import { INodeProperties } from 'n8n-workflow';

export const n8nWorkflowDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: 'getAll',
		displayOptions: {
			show: {
				resource: ['workflow'],
			},
		},
		options: [
			{
				name: 'Get All',
				value: 'getAll',
				action: 'Get all n8n workflows',
				routing: {
					request: {
						method: 'GET',
						url: '/workflows',
					},
				},
			},
		],
	},
];

const getAllOperation: INodeProperties[] = [
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		default: {},
		displayOptions: {
			show: {
				operation: ['getAll'],
				resource: ['workflow'],
			},
		},
		options: [
			{
				displayName: 'Return Only Active Workflows',
				name: 'activeWorkflows',
				type: 'boolean',
				default: false,
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'string',
				default: '',
			},
		],
	},
];

export const n8nWorkflowFields: INodeProperties[] = [...getAllOperation];
