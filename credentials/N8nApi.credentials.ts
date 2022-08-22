import { IAuthenticateGeneric, ICredentialType, INodeProperties } from 'n8n-workflow';

export class N8nApi implements ICredentialType {
	name = 'n8nApi';
	// eslint-disable-next-line n8n-nodes-base/cred-class-field-display-name-miscased
	displayName = 'n8n node API';
	documentationUrl = 'https://github.com/harshil1712/n8n-nodes-n8n-api#readme';
	properties: INodeProperties[] = [
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: '',
			required: true,
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			default: '',
			required: true,
		},
	];

	authenticate = {
		type: 'generic',
		properties: {
			headers: {
				'X-N8N-API-KEY': '={{$credentials.apiKey}}',
			},
		},
	} as IAuthenticateGeneric;
}
