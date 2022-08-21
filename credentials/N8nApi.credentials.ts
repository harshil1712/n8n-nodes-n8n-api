import { IAuthenticateGeneric, ICredentialType, INodeProperties } from 'n8n-workflow';

export class n8nApi implements ICredentialType {
	name = 'n8nApi';
	displayName = 'n8n node API';
	documentationUrl = 'https://github.com/harshil1712/n8n-nodes-n8n-api#readme';
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
