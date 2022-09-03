import { INodeProperties } from 'n8n-workflow';

export const n8nExecutionDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		default: 'getAll',
		displayOptions: {
			show: {
				resource: ['execution'],
			},
		},
		options: [
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete an execution',
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get execution',
			},
			{
				name: 'Get All',
				value: 'getAll',
				action: 'Get executions',
			},
		],
	},
];

const idField: INodeProperties[] = [
	{
		displayName: 'ID',
		name: 'id',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['execution'],
				operation: ['get', 'delete'],
			},
		},
		default: '',
		description: 'ID of the workflow you want to fetch',
	},
];

const getAllOperation: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['execution'],
				operation: ['getAll'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['execution'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 250,
		},
		default: 50,
		description: 'Max number of results to return',
	},
	{
		displayName: 'Include Data',
		name: 'includeData',
		type: 'boolean',
		default: false,
		description: "Whether or not to include the execution's detailed data",
		displayOptions: {
			show: {
				operation: ['getAll', 'get'],
				resource: ['execution'],
			},
		},
	},
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
				operation: ['getAll'],
				resource: ['execution'],
			},
		},
	},
	{
		displayName: 'Workflow ID',
		name: 'workflowId',
		type: 'number',
		default: '',
		description: 'Workflow to filter the executions by',
		displayOptions: {
			show: {
				operation: ['getAll'],
				resource: ['execution'],
			},
		},
	},
];

export const n8nExecutionFields: INodeProperties[] = [...getAllOperation, ...idField];
