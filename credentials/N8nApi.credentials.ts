import { IAuthenticateGeneric, ICredentialType, INodeProperties } from 'n8n-workflow';

export class N8nApi implements ICredentialType {
	name = 'N8nApi';
	displayName = 'n8n node';
	// Uses the link to this tutorial as an example
	// Replace with your own docs links when building your own nodes
	documentationUrl =
		'https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/';
	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: '',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			default: '',
		},
	];
	authenticate = {
		type: 'generic',
		properties: {
			// TO DO: Add your own authentication properties here
			// header: {
			// 	'X-N8N-API-KEY': '={{$credentials.apiKey}}'
			// }
		},
	} as IAuthenticateGeneric;
}
