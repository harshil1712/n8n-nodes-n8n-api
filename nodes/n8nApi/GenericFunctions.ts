import { IExecuteFunctions } from 'n8n-core';

import { OptionsWithUri } from 'request';

import { IDataObject, ILoadOptionsFunctions, NodeApiError } from 'n8n-workflow';

export async function apiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	method: string,
	endpoint: string,
	body: object,
	query?: IDataObject,
	uri?: string,
	option: IDataObject = {},
): Promise<any> {
	const credentials = await this.getCredentials('n8nApi');
	query = query || {};
	const options: OptionsWithUri = {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			'X-N8N-API-KEY': `${credentials.apiKey}`,
		},
		method,
		body,
		qs: query,
		uri: uri || `${credentials.baseUrl}/api/v1${endpoint}`,
		json: true,
	};

	if (Object.keys(option).length !== 0) {
		Object.assign(options, option);
	}

	if (Object.keys(body).length === 0) {
		delete options.body;
	}
	try {
		return await this.helpers.requestWithAuthentication.call(this, 'n8nApi', options);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error);
	}
}
