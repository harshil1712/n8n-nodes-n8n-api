import { IExecuteFunctions } from 'n8n-core';
import { GenericValue, IDataObject, INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';
import { apiRequest, apiRequestAllItems } from './GenericFunctions';
import { n8nWorkflowDescription, n8nWorkflowFields } from './N8nWorkflowDescription';
import { n8nExecutionDescription, n8nExecutionFields } from './n8nExecutionDescription';

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
				name: 'n8nApi',
				required: true,
			},
		],
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
					{
						name: "Execution",
						value: "execution",
					},
				],
				default: 'workflow',
			},
			// Operations will go here
			...n8nWorkflowDescription,
			...n8nExecutionDescription,

			...n8nWorkflowFields,
			...n8nExecutionFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const length = items.length;
		const returnData: IDataObject[] = [];
		let responseData;

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;
		const credentials = await this.getCredentials('n8nApi') as IDataObject;

		let returnAll = false;
		let endpoint = '';
		let requestMethod = '';

		const body: IDataObject = {};
		const qs: IDataObject = {};

		if (resource === 'workflow') {
			endpoint = '/workflows';

			if (operation === 'getAll') {
				for (let i = 0; i < length; i++) {
					try {
						requestMethod = 'GET';
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						if (additionalFields.tags) {
							qs.tags = additionalFields.tags as string;
						}
						if (additionalFields.activeWorkflows && additionalFields.activeWorkflows === true) {
							qs.active = true;
						}
						console.log(qs);
						responseData = await apiRequestAllItems.call(this, 'GET', endpoint, 'data', {}, qs);

						if (returnAll === false) {
							const limit = this.getNodeParameter('limit', i) as number;
							responseData = responseData.splice(0, limit);
						}

						returnData.push.apply(returnData, responseData);
					} catch (error) {
						if (this.continueOnFail()) {
							returnData.push({ error: error.message });
							continue;
						}
						throw error;
					}
				}
			}
		}
		else{
			// add other parameters (add value of parameter as array element)
			try {
				['includeData', 'workflowId'].forEach(prop => {
					qs[prop] = this.getNodeParameter(prop, 0) as string;
				})

				if (!this.getNodeParameter('returnAll', 0)){
					qs.limit = this.getNodeParameter('limit', 0) as number;
				}
			} catch (error) {
				// nothing bad happens, just for this this prop not happen.
			}

			// add additional fields to body
			const props =  this.getNodeParameter('additionalFields', 0) as object;
			for(const prop in props){
				if(props.hasOwnProperty(prop)){
					qs[prop] = props[prop as keyof typeof props] as string[];
					qs[prop] = qs[prop]?.toString();
				}
			}

			// prepaire endpoint
			endpoint = credentials.baseUrl as string;
			endpoint += operation === 'execution' ? '/executions' : '/credentials';
			endpoint = endpoint.replace(/\/\//g, '\/');

			if(qs.workflowId){
				endpoint += `/${qs.workflowId}`;
				delete qs.workflowId;
			}

			const reqInfo = {
				method: 'GET', //TODO
				qs,
				uri: endpoint,
				json: true,
				headers: {
					'X-N8N-API-KEY': credentials.apiKey,
				},
			}

		}
		return [this.helpers.returnJsonArray(returnData)];
	}
}
