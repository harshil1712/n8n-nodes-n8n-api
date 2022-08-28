import { INodeProperties } from 'n8n-workflow';

export const n8nExecutionDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: 'getExecutions',
		displayOptions: {
			show: {
				resource: ['execution'],
			},
		},
		options: [
			{
				name: 'Get Executions',
				value: 'getExecutions',
				action: 'Get executions',
			},
			{
				name: 'Get Execution',
				value: 'getExecution',
				action: 'Get execution',
			},
			{
				name: 'Delete Execution',
				value: 'deleteExecution',
				action: 'Delete execution',
			},
		],
	},
];

const getAllOperation: INodeProperties[] = [
	{
		displayName: 'Include Data',
		name: 'includeData',
		type: 'boolean',
		default: false,
		description: "Whether or not to include the execution's detailed data",
		displayOptions: {
			show: {
				'/operation': ['getExecutions', 'getExecution'],
			},
		},
	},
	{
		displayName: 'Workflow ID',
		name: 'workflowId',
		type: 'number',
		required: true,
		default: 0,
		description: 'The ID of the execution',
		displayOptions: {
			show: {
				'/operation': ['getExecution', 'deleteExecution'],
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		default: {},
		options: [
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				description: 'Status to filter the executions by',
				options: [
					{
						name: 'Error',
						value: 'error',
					},
					{
						name: 'Success',
						value: 'success',
					},
					{
						name: 'Waiting',
						value: 'waiting',
					},
				],
				default: 'success',
				displayOptions: {
					show: {
						'/operation': ['getExecutions'],
					},
				},
			},
		],
	},
];

export const n8nExecutionFields: INodeProperties[] = [...getAllOperation];
