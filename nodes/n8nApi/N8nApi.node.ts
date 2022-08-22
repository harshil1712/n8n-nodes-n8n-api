import { IExecuteFunctions } from 'n8n-core';
import { IDataObject, INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';
import { apiRequest } from './GenericFunctions';
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
			...n8nWorkflowFields,

			...n8nExecutionDescription,
			...n8nExecutionFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];
		let responseData;

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		let returnAll = false;
		let endpoint = '';
		let requestMethod = '';

		const body: IDataObject = {};
		const qs: IDataObject = {};

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

		if (resource === 'workflow') {
			endpoint = '/workflows';

			if (operation === 'getAll') {
				requestMethod = 'GET';
				responseData = await apiRequest.call(this, requestMethod, endpoint, body, qs);
				returnData.push(...responseData.data);
			}
		}
		return [this.helpers.returnJsonArray(returnData)];
	}
}
