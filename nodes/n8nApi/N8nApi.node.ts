import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { n8nWorkflowDescription } from './N8nWorkflowDescription';

export class N8nApi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'n8n node',
		name: 'N8nApi',
		icon: 'file:n8nlogo.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Get data from the n8n API',
		defaults: {
			name: 'n8n node',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'N8nApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.baseUrl}}/api/v1',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'X-N8N-API-KEY': '={{$credentials.apiKey}}',
			},
		},

		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Workflow',
						value: 'workflow',
					},
				],
				default: 'workflow',
			},
			// Operations will go here
			...n8nWorkflowDescription,
		],
	};
}
