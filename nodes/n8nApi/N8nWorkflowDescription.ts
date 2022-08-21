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
