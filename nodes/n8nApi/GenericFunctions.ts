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

export async function apiRequestAllItems(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	method: string,
	endpoint: string,
	propertyName: string,
	// tslint:disable-next-line:no-any
	body: any = {},
	query: IDataObject = {},
	// tslint:disable-next-line:no-any
): Promise<any> {
	const returnData: IDataObject[] = [];

	let responseData;
	let previousCursor: string | undefined;


	do {
		responseData = await apiRequest.call(this, method, endpoint, body, query);

		if(!Array.isArray(responseData[propertyName]))
			return [responseData[propertyName]];
		console.log("🚀 ~ file: GenericFunctions.ts ~ line 65 ~ responseData", responseData)

		returnData.push.apply(returnData, responseData[propertyName]);
		if (query.limit && returnData.length >= query.limit) {
			return returnData;
		}
		// if(previousCursor === query.cursor)
			// break;
		// previousCursor = responseData.cursor;
		query.cursor = responseData.nextCursor;

	} while (responseData.nextCursor !== null);

	return returnData;
}
