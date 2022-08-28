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
				name: 'Create',
				value: 'create',
				action: 'Create an n8n workflow',
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

const createOperation: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['workflow'],
				operation: ['create'],
			},
		},
		description: 'Enter the name of the new workflow',
	},
	// {
	// 	displayName: 'Add Node',
	// 	name: 'addNodeUi',
	// 	type: 'fixedCollection',
	// 	placeholder: 'Add Node',
	// 	default: {},
	// 	typeOptions: {
	// 		multipleValues: true,
	// 	},
	// 	displayOptions: {
	// 		show: {
	// 			resource: ['workflow'],
	// 			operation: ['create'],
	// 		},
	// 	},
	// 	required: true,
	// 	options: [
	// 		{
	// 			name: 'addNode',
	// 			displayName: 'Add Node',
	// 			values: [
	// 				{
	// 					displayName: 'Node Name or ID',
	// 					name: 'name',
	// 					type: 'options',
	// 					description:
	// 						'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
	// 					default: '',
	// 					required: true,
	// 					typeOptions: {
	// 						loadOptionsMethod: 'getNodes',
	// 					},
	// 				},
	// 				{
	// 					displayName: 'Webhook ID',
	// 					name: 'webhookId',
	// 					type: 'string',
	// 					default: '',
	// 					description: 'Webhook ID for the node',
	// 				},
	// 				{
	// 					displayName: 'Disabled',
	// 					name: 'disabled',
	// 					type: 'boolean',
	// 					default: false,
	// 					description: 'Whether to disable the node',
	// 				},
	// 				{
	// 					displayName: 'Notes in Flow',
	// 					name: 'notesInFlow',
	// 					type: 'boolean',
	// 					default: false,
	// 					description: 'Whether to add notes in the flow',
	// 				},
	// 				{
	// 					displayName: 'Notes',
	// 					name: 'notes',
	// 					type: 'string',
	// 					default: '',
	// 					description: 'Notes for the node',
	// 					typeOptions: {
	// 						rows: 4,
	// 					},
	// 					// displayOptions: {
	// 					// 	show: {
	// 					// 		notesInFlow: [false],
	// 					// 		operation: ['create'],
	// 					// 	},
	// 					// },
	// 				},
	// 				{
	// 					displayName: 'Type',
	// 					name: 'type',
	// 					type: 'string',
	// 					default: '',
	// 					description: 'Node type',
	// 				},
	// 				{
	// 					displayName: 'Type Version',
	// 					name: 'typeVersion',
	// 					type: 'number',
	// 					default: '',
	// 					description: 'Node Version',
	// 				},
	// 				{
	// 					displayName: 'Position',
	// 					name: 'positionUi',
	// 					type: 'fixedCollection',
	// 					default: {},
	// 					options: [
	// 						{
	// 							name: 'position',
	// 							displayName: 'Position',
	// 							values: [
	// 								{
	// 									displayName: 'X-Axis',
	// 									name: 'xAxis',
	// 									type: 'number',
	// 									description: 'X-Axis Position',
	// 									default: '',
	// 								},
	// 								{
	// 									displayName: 'Y-Axis',
	// 									name: 'yAxis',
	// 									type: 'number',
	// 									default: '',
	// 									description: 'Y-Axis Position',
	// 								},
	// 							],
	// 						},
	// 					],
	// 				},
	// 				{
	// 					displayName: 'Parameters',
	// 					name: 'parameters',
	// 					type: 'json',
	// 					default: '',
	// 					description: 'Additional Parameters for the node',
	// 				},
	// 				{
	// 					displayName: 'Credentials',
	// 					name: 'credentials',
	// 					type: 'json',
	// 					default: '',
	// 					description: 'Credentials for the node',
	// 				},
	// 			],
	// 		},
	// 	],
	// },
	{
		displayName: 'Nodes',
		name: 'nodes',
		required: true,
		type: 'json',
		default: '',
		displayOptions: {
			show: {
				resource: ['workflow'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Connections',
		name: 'connections',
		required: true,
		type: 'json',
		default: '',
		displayOptions: {
			show: {
				resource: ['workflow'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Workflow Settings',
		name: 'workflowSettingsUi',
		type: 'fixedCollection',
		placeholder: 'Workflow Settings',
		default: {},
		displayOptions: {
			show: {
				resource: ['workflow'],
				operation: ['create'],
			},
		},
		required: true,
		options: [
			{
				name: 'settings',
				displayName: 'Workflow Settings',
				values: [
					{
						displayName: 'Save Execution Progress',
						name: 'saveExecutionProgress',
						type: 'boolean',
						default: false,
					},
					{
						displayName: 'Save Manual Executions',
						name: 'saveManualExecutions',
						type: 'boolean',
						default: false,
					},
					{
						displayName: 'Save Data Error Execution',
						name: 'saveDataErrorExecution',
						type: 'options',
						options: [
							{
								name: 'All',
								value: 'all',
							},
							{
								name: 'None',
								value: 'none',
							},
						],
						default: 'none',
					},
					{
						displayName: 'Save Data Success Execution',
						name: 'saveDataSuccessExecution',
						type: 'options',
						options: [
							{
								name: 'All',
								value: 'all',
							},
							{
								name: 'None',
								value: 'none',
							},
						],
						default: 'none',
					},
					{
						displayName: 'Execution Timeout',
						name: 'executionTimeout',
						type: 'number',
						default: 500,
						typeOptions: {
							maxValue: 3600,
						},
					},
					{
						displayName: 'Error Workflow',
						name: 'errorWorkflow',
						type: 'string',
						default: '',
						description: 'The ID of the workflow that contains the error trigger node',
					},
					{
						displayName: 'Timezone',
						name: 'timezone',
						type: 'string',
						default: 'America/New_York',
					},
				],
			},
		],
	},
	{
		displayName: 'Static Data',
		name: 'staticData',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['workflow'],
				operation: ['create'],
			},
		},
	},
];

export const n8nWorkflowFields: INodeProperties[] = [
	...getAllOperation,
	...idField,
	...createOperation,
];
