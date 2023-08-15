import { INodeProperties } from 'n8n-workflow';
import {
	locationTime,
	paginate,
	queryField,
	resulteFilter,
	resulteFilterForProdAndShop,
	shopProdLocTime,
} from './sharedFields';
import { googleLanguage } from './staticOptions';

export const googleSearchOperation: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['gSearch'],
			},
		},
		options: [
			{
				name: 'Google Images',
				value: 'gImages',
				action: 'Get an images search resulte',
				description: 'Get an Images search resulte',
				routing: {
					request: {
						method: 'GET',
						url: '/search',
						qs: {
							search_type: 'images',
						},
					},
				},
			},
			{
				name: 'Google News',
				value: 'gnews',
				action: 'Get a news search resulte',
				description: 'Get a news search resulte',
				routing: {
					request: {
						method: 'GET',
						url: '/search',
						qs: {
							search_type: 'news',
						},
					},
				},
			},
			{
				name: 'Google Place',
				value: 'gMap',
				action: 'Get an place search resulte',
				description: 'Get an Place search resulte',
				routing: {
					request: {
						method: 'GET',
						url: '/search',
						qs: {
							search_type: 'places',
						},
					},
				},
			},
			{
				name: 'Google Place Details',
				value: 'gMapD',
				action: 'Get an place details search resulte',
				description: 'Get an Place Details search resulte',
				routing: {
					request: {
						method: 'GET',
						url: '/search',
						qs: {
							search_type: 'place_details',
						},
					},
				},
			},
			{
				name: 'Google Product',
				value: 'gProduct',
				action: 'Get a product search resulte',
				description: 'Get a Product search resulte',
				routing: {
					request: {
						method: 'GET',
						url: '/search',
						qs: {
							search_type: 'product',
						},
					},
				},
			},
			{
				name: 'Google Shopping',
				value: 'gshopping',
				action: 'Get a shopping search resulte',
				description: 'Get a Shopping search resulte',
				routing: {
					request: {
						method: 'GET',
						url: '/search',
						qs: {
							search_type: 'shopping',
						},
					},
				},
			},
			{
				name: 'Google Videos',
				value: 'gVideos',
				action: 'Get an videos search resulte',
				description: 'Get an Videos search resulte',
				routing: {
					request: {
						method: 'GET',
						url: '/search',
						qs: {
							search_type: 'videos',
						},
					},
				},
			},
			{
				name: 'Google Web Search',
				value: 'gWeb',
				action: 'Get a web search resulte',
				description: 'Get a web search resulte',
				routing: {
					request: {
						method: 'GET',
						url: '/search',
					},
				},
			},
		],
		default: 'gWeb',
	},
];
export const googleSearchField: INodeProperties[] = [
	queryField,
	{
		displayName: 'Flatten Results',
		name: 'flatten_results',
		description:
			'Whether the API flattens the inline_videos, inline_images, inline_tweets, inline_podcasts and local_results and shows them inline with the organic_results. This is useful if you want a simplified list of all of the results shown for an organic web search, irrespective of the type of result. When flatten_results=true then a new property type is added to each item in the organic_results array indicating the type of result (i.e. "ad", "inline_tweets" etc).',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['gSearch'],
				operation: ['gWeb'],
			},
		},
		routing: {
			request: {
				qs: {
					flatten_results: '={{$value}}',
				},
			},
		},
	},
	/*---------------------------News Field----------------------*/
	{
		displayName: 'News Type',
		name: 'news_type',
		description:
			'Determines the type of news retrieved when the search_type parameter is set to news. Can be set to all(default) or blogs (just blogs).',
		type: 'options',
		default: 'all',
		options: [
			{ name: 'All News', value: 'all' },
			{ name: 'Blogs Only', value: 'blogs' },
		],
		displayOptions: {
			show: {
				resource: ['gSearch'],
				operation: ['gnews'],
			},
		},
		routing: {
			request: {
				qs: {
					news_type: '={{$value}}',
				},
			},
		},
	},
	{
		displayName: 'Show Duplicates',
		name: 'show_duplicates',
		description:
			'Whether duplicates are shown in the results when the search_type parameter is set to news. Must be used in conjunction with the sort_by parameter where sort_by is set to date. Valid values are true or false. Defaults to false.',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['gSearch'],
				operation: ['gnews'],
			},
		},
		routing: {
			request: {
				qs: {
					show_duplicates: '={{$value}}',
					sort_by: 'date',
				},
			},
		},
	},
	/*---------------------------Images Field----------------------*/
	{
		displayName: 'Image Options',
		name: 'imagesOptions',
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: ['gSearch'],
				operation: ['gImages'],
			},
		},
		options: [
			{
				displayName: 'Images Type',
				name: 'images_type',
				description:
					'Allows you to set the type of the images returned when search_type=images. Valid values are clipart, line_drawing, or gif.',
				type: 'options',
				default: 'clipart',
				options: [
					{ name: 'Clipart', value: 'clipart' },
					{ name: 'Line Drawing', value: 'line_drawing' },
					{ name: 'GIF', value: 'gif' },
				],
				routing: {
					request: {
						qs: {
							images_type: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Image Size',
				name: 'images_Size',
				description:
					'Allows you to set the size of the images returned when search_type=images. Valid values are large, medium, or icon.',
				type: 'options',
				default: 'large',
				options: [
					{ name: 'Large', value: 'large' },
					{ name: 'Medium', value: 'medium' },
					{ name: 'Icon', value: 'icon' },
				],
				routing: {
					request: {
						qs: {
							images_Size: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Image Color',
				name: 'images_color',
				description:
					'Allows you to set the color of the images returned when search_type=images. Valid values are any, black_and_white, transparent, red, orange, yellow, green, teal, blue, purple, pink, white, gray, black or brown.',
				type: 'options',
				default: 'any',
				options: [
					{
						name: 'All',
						value: 'any',
					},
					{
						name: 'Black',
						value: 'black',
					},
					{
						name: 'Black and White',
						value: 'black_and_white',
					},
					{
						name: 'Blue',
						value: 'blue',
					},
					{
						name: 'Brown',
						value: 'brown',
					},
					{
						name: 'Gray',
						value: 'gray',
					},
					{
						name: 'Green',
						value: 'green',
					},
					{
						name: 'Orange',
						value: 'orange',
					},
					{
						name: 'Pink',
						value: 'pink',
					},
					{
						name: 'Purple',
						value: 'purple',
					},
					{
						name: 'Red',
						value: 'red',
					},
					{
						name: 'Teal',
						value: 'teal',
					},
					{
						name: 'Transparent',
						value: 'transparent',
					},
					{
						name: 'Yellow',
						value: 'yellow',
					},
				],
				routing: {
					request: {
						qs: {
							images_color: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Image Usage Rights',
				name: 'images_usage',
				description:
					'Allows you to specify the usage rights of the images returned when search_type=images. Valid values are reuse_with_modification, reuse, non_commercial_reuse_with_modification or non_commercial_reuse.',
				type: 'options',
				default: 'reuse_with_modification',
				options: [
					{ name: 'Reuse with Modification', value: 'reuse_with_modification' },
					{ name: 'Reuse', value: 'reuse' },
					{ name: 'Non Commercial Reuse', value: 'non_commercial_reuse' },
					{
						name: 'Non Commercial Reuse with Modification',
						value: 'non_commercial_reuse_with_modification',
					},
				],
				routing: {
					request: {
						qs: {
							images_usage: '={{$value}}',
						},
					},
				},
			},
		],
	},

	/*---------------------------Place Details Field----------------------*/
	{
		displayName: 'Data ID',
		description:
			'The data_id of the Place to retrieve data for. data_id values are returned in Google Places requests.',
		name: 'data_id',
		type: 'string',
		default: '0x89c259cea3b62d4d:0x4519bf551f37923f',
		displayOptions: {
			show: {
				operation: ['gMapD'],
			},
		},
		routing: {
			request: {
				qs: {
					data_id: `={{$value}}`,
				},
			},
		},
	},
	{
		displayName: 'Data CID',
		description:
			'The data_cid of the Place to retrieve data for. data_cid values are returned in Google Places requests.',
		name: 'data_cid',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				operation: ['gMapD'],
			},
		},
		routing: {
			request: {
				qs: {
					data_cid: `={{$value}}`,
				},
			},
		},
	},
	{
		displayName: 'Google UI Language',
		name: 'hlMapD',
		description: 'The hl parameter determines the Google UI language to return results',
		type: 'options',
		options: googleLanguage,
		default: 'en',
		displayOptions: {
			show: {
				resource: ['gSearch'],
				operation: ['gMapD'],
			},
		},
		routing: {
			request: {
				qs: {
					gl: '={{$value}}',
				},
			},
		},
	},
	{
		displayName: 'Results & Filter',
		name: 'rANDfMapD',
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: ['gSearch'],
				operation: ['gMapD'],
			},
		},
		options: [
			{
				displayName: 'Output',
				name: 'output',
				description:
					'Determines the format in which results are returned. Can be set to JSON(default) to get the results as structured JSON or csv to return the results in CSV format. When using csv you can also use the csv_fields parameter to specify which fields to return in the CSV',
				type: 'options',
				default: 'json',
				options: [
					{ name: 'HTML', value: 'html' },
					{ name: 'JSON', value: 'json' },
					{ name: 'CSV', value: 'csv' },
				],
				routing: {
					request: {
						qs: {
							output: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Include Raw HTML',
				name: 'include_html',
				description:
					'Whether raw HTML is included in the response (this can increase the size of the response)',
				type: 'boolean',
				default: true,
				routing: {
					request: {
						qs: {
							include_html: '={{$value}}',
						},
					},
				},
			},
		],
	},
	/*---------------------------Shopping Field----------------------*/
	{
		displayName: 'Shopping Options',
		name: 'shoppingOptions',
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: ['gSearch'],
				operation: ['gshopping'],
			},
		},
		options: [
			{
				displayName: 'Shopping Condition',
				name: 'shopping_condition',
				description:
					'The condition of products returned when search_type=shopping. Can be set to new or used.',
				type: 'options',
				default: 'new',
				options: [
					{ name: 'Used', value: 'used' },
					{ name: 'New', value: 'new' },
				],
				routing: {
					request: {
						qs: {
							shopping_condition: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Shopping Merchants',
				description:
					"A comma-separated list of merchant IDs to retrieve shopping results for when search_type=shopping. Merchant ID's can be found in the merchagg: section of any Google Shopping URL.",
				name: 'shopping_merchants',
				type: 'string',
				default: '',
				placeholder: 'enter Merchant IDs',
				routing: {
					request: {
						qs: {
							shopping_merchants: `={{$value}}`,
						},
					},
				},
			},
			{
				displayName: 'Shopping Filter',
				description: 'A shopping filter (i.e. "Brand") to filter the results to.',
				name: 'shopping_filter',
				type: 'string',
				default: '',
				routing: {
					request: {
						qs: {
							shopping_filter: `={{$value}}`,
						},
					},
				},
			},
			{
				displayName: 'Buy on Google',
				name: 'shopping_buy_on_google',
				description:
					'Whether the "Buy on Google" option is selected when running a search_type=shopping search. Valid values are true or false (defaults to false).',
				type: 'boolean',
				default: false,
				routing: {
					request: {
						qs: {
							shopping_buy_on_google: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Shopping Price Min',
				description:
					'The minimum price of products returned when search_type=shopping. For example shopping_price_min=4.99.',
				name: 'shopping_price_min',
				type: 'number',
				default: '',
				typeOptions: {
					minValue: 0,
				},
				routing: {
					request: {
						qs: {
							shopping_price_min: `={{$value}}`,
						},
					},
				},
			},
			{
				displayName: 'Shopping Price Max',
				description:
					'The maximum price of products returned when search_type=shopping. For example shopping_price_min=29.99.',
				name: 'shopping_price_max',
				type: 'number',
				default: '',
				typeOptions: {
					minValue: 0,
				},
				routing: {
					request: {
						qs: {
							shopping_price_max: `={{$value}}`,
						},
					},
				},
			},
		],
	},

	/*---------------------------Product Field----------------------*/
	{
		displayName: 'Sub Type',
		name: 'sub_type',
		type: 'options',
		default: 'product',
		options: [
			{ name: 'Google Product', value: 'product' },
			{ name: 'Google Product Sellers Online', value: 'sellers_online' },
			{ name: 'Google Product Reviews', value: 'reviews' },
			{ name: 'Google Product Specifications', value: 'specifications' },
		],
		displayOptions: {
			show: {
				operation: ['gProduct'],
			},
		},
		routing: {
			request: {
				qs: {
					sub_type: '={{$value}}',
				},
			},
		},
	},
	{
		displayName: 'Product Options',
		name: 'productOptions',
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: ['gSearch'],
				operation: ['gProduct'],
			},
		},
		options: [
			{
				displayName: 'Shopping Filter',
				description:
					'The product to get results for Google Shopping Products results. Normally found from shopping results for supported products (for example: https://www.google.com/shopping/product/PRODUCT_ID). The product_id is also returned in the ID property of the shopping_results array for requests with search_type=shopping',
				name: 'product_id',
				type: 'string',
				default: '18187242513988350226',
				routing: {
					request: {
						qs: {
							product_id: `={{$value}}`,
						},
					},
				},
			},
			{
				displayName: 'Product Free Shipping',
				description:
					'Whether to filter to only products with free shipping. Valid values are true or false. Only applicable when search_type=product and product_type=sellers_online or product_type=sellers_local.',
				name: 'product_free_shipping',
				type: 'boolean',
				default: false,
				routing: {
					request: {
						qs: {
							product_free_shipping: `={{$value}}`,
						},
					},
				},
			},
			{
				displayName: 'Product Condition Used',
				description:
					'Whether to filter to only used (non-new) products. Valid values are true or false. Only applicable when search_type=product and product_type=sellers_online or product_type=sellers_local.',
				name: 'product_condition_used',
				type: 'boolean',
				default: false,
				routing: {
					request: {
						qs: {
							product_condition_used: `={{$value}}`,
						},
					},
				},
			},
			{
				displayName: 'Product Condition Used',
				description:
					'Whether to filter to only new (non-used) products. Valid values are true or false. Only applicable when search_type=product and product_type=sellers_online or product_type=sellers_local.',
				name: 'product_condition_new',
				type: 'boolean',
				default: true,
				routing: {
					request: {
						qs: {
							product_condition_new: `={{$value}}`,
						},
					},
				},
			},
		],
	},

	/*---------------------------Shared Field----------------------*/
	...locationTime,
	...shopProdLocTime,
	...resulteFilter,
	...resulteFilterForProdAndShop,
	...paginate,
];
