import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { googleSearchField, googleSearchOperation } from './googleSearchDescription';
export class Valueserp implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Value Serp',
name: 'valueserp',
// eslint-disable-next-line n8n-nodes-base/node-class-description-icon-not-svg
icon: 'file:valueserp.png',
group: ['transform'],
version: 1,
subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
description: 'A Search Engin using value serp API',
defaults: {
	name: 'Value Serp',
},
inputs: ['main'],
outputs: ['main'],
credentials: [
	{
		name: 'valueserpApi',
		required: true,
	},
],
requestDefaults: {
	baseURL: 'https://api.valueserp.com/',
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
},
//NOTE : THIS IS A declarative-style node THERE IS NO EXCUTE FUNCTION
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Google Search',
						value: 'gSearch',
					},
				],
				default: 'gSearch',
			},
			...googleSearchOperation,
			...googleSearchField
		]
	};
}
