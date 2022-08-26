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
				name: 'Activate',
				value: 'activate',
				action: 'Activate an n8n workflow',
			},
			{
				name: 'Deactivate',
				value: 'deactivate',
				action: 'Deactivate an n8n workflow',
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete an n8n workflow',
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get an n8n workflow',
			},
			{
				name: 'Get All',
				value: 'getAll',
				action: 'Get all n8n workflows',
			},
		],
	},
];

const getAllOperation: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['workflow'],
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
				resource: ['workflow'],
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

const idField: INodeProperties[] = [
	{
		displayName: 'ID',
		name: 'id',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['workflow'],
				operation: ['get', 'delete', 'activate', 'deactivate'],
			},
		},
		default: '',
		description: 'ID of the workflow you want to fetch',
	},
];

export const n8nWorkflowFields: INodeProperties[] = [...getAllOperation, ...idField];
