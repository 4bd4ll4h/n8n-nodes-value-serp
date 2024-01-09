import { INodeProperties } from "n8n-workflow";
import { googleDomains, googleCountries, googleLanguage } from "./staticOptions";

export const queryField = {
	displayName: 'Search Query',
	description:
		"The query you want to search. You can use any term you'd use in a regular search engine query - inurl: site: intitle: etc.",
	name: 'q',
	type: 'string',
	default: '',
	displayOptions: {
		show: {
			resource: ['gSearch'],
		},
		hide: {
			operation: ['gProduct', 'gMapD']
		}
	},
	routing: {
		request: {
			qs: {
				q: `={{$value}}`,
			},
		},
	},
} as INodeProperties;

export const locationTime: INodeProperties[] = [
	{
		displayName: 'Location & Time Period',
		name: 'locationTime',
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: ['gSearch'],
			},
			hide: {
				operation: ['gProduct', 'gshopping', 'gMapD']
			}
		},
		options: [
			{
				displayName: 'Location',
				name: 'addLocation',
				description:
					'Determines the geographic location in which the query is executed. You can enter any location as free-text, but if you supply a full_name from the Locations API then the google_domain, gland hlparameters are automatically updated to the domain, country and language that match the built-in location (note that this behaviour can be disabled via the location_autoparameter).\nGoogle Maps search_type=places requests\nTo get Google Maps for search_type=places results based on latitude and longitude coordinates specify your location parameter in the form location=lat:43.437677,lon:-3.8392765,zoom:15 where 43.437677 is your latitude value, -3.8392765 is your longitude value and 15 is your zoom value. Valid zoom values are between 1 (maximum zoom-out) and 20 (maximum zoom-in).',
				type: 'string',
				default: '',
				routing: {
					request: {
						qs: {
							location: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Google Domain',
				name: 'google_domain',
				description: 'The Google domain to use to run the search query. Defaults to google.com.',
				type: 'options',
				options: googleDomains,
				default: 'google.co.uk',
				routing: {
					request: {
						qs: {
							google_domain: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Google Country',
				name: 'gl',
				description: 'The gl parameter determines the Google country to use for the query',
				type: 'options',
				options: googleCountries,
				default: 'sg',
				routing: {
					request: {
						qs: {
							gl: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Google UI Language',
				name: 'hl',
				description: 'The hl parameter determines the Google UI language to return results',
				type: 'options',
				options: googleLanguage,
				default: 'en',
				routing: {
					request: {
						qs: {
							hl: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Sort,Date And Time Period',
				name: "collectionLT",
				type: "fixedCollection",
				default: {},
				options: [

					{
						displayName: 'Add Values',
						name: 'time_fields',
						values: [
							{
								displayName: 'Time Period',
								name: 'time_period',
								required:true,
								description:
									'Determines the time period of the results shown. It can be set to last_hour, last_day, last_week, last_month, last_year or custom. When using custom you must also specifiy one or both of the time_period_min or time_period_max parameters to define the custom time period.',
								type: 'options',
								options: [
									{
										name: 'Custom',
										value: 'custom',
									},
									{
										name: 'Last Day',
										value: 'last_day',
									},
									{
										name: 'Last Hour',
										value: 'last_hour',
									},
									{
										name: 'Last Month',
										value: 'last_month',
									},
									{
										name: 'Last Week',
										value: 'last_week',
									},
									{
										name: 'Last Year',
										value: 'last_year',
									},
								],
								default: 'last_year',
								routing: {
									request: {
										qs: {
											time_period: '={{$value}}',
										},
									},
								},
							},
							{
								displayName: 'Min Time',
								name: 'time_period_min',
								type: 'dateTime',
								default: '',

								routing: {
									request: {
										qs: {
											time_period_min: '={{$value}}',
										},
									},
								},
							},
							{
								displayName: 'Max Time',
								name: 'time_period_max',
								type: 'dateTime',
								default: '',

								routing: {
									request: {
										qs: {
											time_period_max: '={{$value}}',
										},
									},
								},
							},
							{
								displayName: 'Sort By',
								name: 'sort_by',
								description:
									'Determines how results are sorted, valid values vary depending on the search_type parameter:\ntype=shopping\nprice_low_to_high, price_high_to_low, review_score\ntype=product\nbase_price, total_price, promotion, seller_rating\ntype=place_reviews\nhighest_rating,lowest_rating In addition the following sort_by values may be used with the majority of other search types:relevance or date',
								type: 'options',
								default: 'date',
								options: [
									{ name: 'Relevance', value: 'relevance' },
									{ name: 'Date', value: 'date' },
								],
								routing: {
									request: {
										qs: {
											sort_by: '={{$value}}',
										},
									},
								},
							},
						]
					}]
			},

		],
	},
]
export const shopProdLocTime: INodeProperties[] = [
	{
		displayName: 'Location',
		name: 'locationTimeSM',
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: ['gWebSearch'],
				operation: ['gProduct', 'gshopping']
			},
		},
		options: [
			{
				displayName: 'Location',
				name: 'addLocation',
				description:
					'Determines the geographic location in which the query is executed. You can enter any location as free-text, but if you supply a full_name from the Locations API then the google_domain, gland hlparameters are automatically updated to the domain, country and language that match the built-in location (note that this behaviour can be disabled via the location_autoparameter).\nGoogle Maps search_type=places requests\nTo get Google Maps for search_type=places results based on latitude and longitude coordinates specify your location parameter in the form location=lat:43.437677,lon:-3.8392765,zoom:15 where 43.437677 is your latitude value, -3.8392765 is your longitude value and 15 is your zoom value. Valid zoom values are between 1 (maximum zoom-out) and 20 (maximum zoom-in).',
				type: 'string',
				default: '',
				routing: {
					request: {
						qs: {
							location: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Google Domain',
				name: 'google_domain',
				description: 'The Google domain to use to run the search query. Defaults to google.com.',
				type: 'options',
				options: googleDomains,
				default: 'google.co.uk',
				routing: {
					request: {
						qs: {
							google_domain: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Google Country',
				name: 'gl',
				description: 'The gl parameter determines the Google country to use for the query',
				type: 'options',
				options: googleCountries,
				default: 'sg',
				routing: {
					request: {
						qs: {
							gl: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Google UI Language',
				name: 'hl',
				description: 'The hl parameter determines the Google UI language to return results',
				type: 'options',
				options: googleLanguage,
				default: 'en',
				routing: {
					request: {
						qs: {
							hl: '={{$value}}',
						},
					},
				},
			}
		],
	},
]
export const resulteFilter: INodeProperties[] = [
	{
		displayName: 'Results & Filter',
		name: 'rANDf',
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: ['gSearch'],
			},
			hide: {
				operation: ['gProduct', 'gMapD', 'gshopping']
			}
		},
		options: [
			{
				displayName: 'URL',
				description:
					'Specifies the URL to open (instead of specifying a query using the q parameter). The URL parameter can be a free-form URL from the target site (as specified in the engine parameter).\nNote To specify the type of parsing applied to the results from the URL parameter, use the search_type parameter.\nNote The URL parameter must be URL-encoded.',
				name: 'url',
				type: 'string',
				default: '',
				routing: {
					request: {
						qs: {
							url: `={{$value}}`,
						},
					},
				},
			},
			{
				displayName: 'Device',
				name: 'device',
				description:
					'Determines the Device to use to get results.\nCan be set to desktop (default) to use a regular desktop web browser, tablet to use a tablet browser (use the tablet_type to choose the type of tablet Device), or mobile to use a mobile browser (use the mobile_type to choose the type of mobile Device).\nNote that not all search_type values are parsed for each Device (for example, some results are parsed in desktop only), see the individual results for more information',
				type: 'options',
				default: 'desktop',
				options: [
					{ name: 'Desktop', value: 'desktop' },
					{ name: 'Tablet', value: 'tablet' },
					{ name: 'Mobile', value: 'mobile' },
				],
				routing: {
					request: {
						qs: {
							device: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Mobile Type',
				name: 'mobile_type',
				description:
					'Determines the type of mobile browser used when device=mobile. Valid values are iphone (to execute mobile searches from an iPhone browser) or android (to execute mobile searches from an Android browser). Defaults to iphone if not set.',
				type: 'options',
				default: 'iphone',
				options: [
					{ name: 'Android', value: 'android' },
					{ name: 'Iphone', value: 'iphone' },
				],
				displayOptions: {
					show: {
						device: ['mobile'],
					},
				},
				routing: {
					request: {
						qs: {
							mobile_type: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Tablet Type',
				name: 'tablet_type',
				description:
					'Determines the type of mobile browser used when device=tablet. Valid values are ipad (to execute mobile searches from an iPad browser) or android (to execute mobile searches from an Android tablet browser). Defaults to ipad if not set.',
				type: 'options',
				default: 'ipad',
				options: [
					{ name: 'Android', value: 'android' },
					{ name: 'Ipad', value: 'ipad' },
				],
				displayOptions: {
					show: {
						device: ['tablet'],
					},
				},
				routing: {
					request: {
						qs: {
							tablet_type: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Include Advertiser Info',
				name: 'include_advertiser_info',
				description:
					"Whether Retrieve the 'advertiser info' for Ads (where published, it's not published on all Ads) by setting include_advertiser_info=true. Advertiser info gives the company name of the company running the Ad.\nNote that requesting advertiser info consumes 2 credits (instead of the normal 1 credit) as additional internal requests are required.",
				type: 'boolean',
				default: false,
				routing: {
					request: {
						qs: {
							include_advertiser_info: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Include Answer Box',
				name: 'include_answer_box',
				description:
					'Whether to include the answer box (sometimes called the "featured snippet") in the organic_results array and treat it as the first result. This may be desirable if you treat the result the search engine displayed in the answer_box as the first organic result.',
				type: 'boolean',
				default: false,
				routing: {
					request: {
						qs: {
							include_answer_box: '={{$value}}',
						},
					},
				},
			},

			{
				displayName: 'Filter',
				name: 'filter',
				description:
					'Determines if the filters for Similar Results and Omitted Results are on or off. Can be set to 1(default) to enable these filters, or 0 to disable filtering.',
				type: 'string',
				default: '',
				routing: {
					request: {
						qs: {
							filter: '={{$value}}',
						},
					},
				},
			},

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
			{
				displayName: 'Cookie',
				name: 'cookie',
				description:
					'The cookie string to send along with the request. Should be URL-encoded. Use this parameter to send custom cookies along with the request made. It will be sent in the cookie HTTP Header made by the platform.',
				type: 'string',
				default: '',
				routing: {
					request: {
						qs: {
							cookie: '={{$value}}',
						},
					},
				},
			},
		],
	},
]
export const resulteFilterForProdAndShop: INodeProperties[] = [
	{
		displayName: 'Results & Filter',
		name: 'rANDfPandS',
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: ['gSearch'],
				operation: ['gProduct', 'gshopping']
			},

		},
		options: [
			{
				displayName: 'URL',
				description:
					'Specifies the URL to open (instead of specifying a query using the q parameter). The URL parameter can be a free-form URL from the target site (as specified in the engine parameter).\nNote To specify the type of parsing applied to the results from the URL parameter, use the search_type parameter.\nNote The URL parameter must be URL-encoded.',
				name: 'url',
				type: 'string',
				default: '',
				routing: {
					request: {
						qs: {
							url: `={{$value}}`,
						},
					},
				},
			},
			{
				displayName: 'Filter',
				name: 'filter',
				description:
					'Determines if the filters for Similar Results and Omitted Results are on or off. Can be set to 1(default) to enable these filters, or 0 to disable filtering.',
				type: 'string',
				default: '',
				routing: {
					request: {
						qs: {
							filter: '={{$value}}',
						},
					},
				},
			},

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
			{
				displayName: 'Cookie',
				name: 'cookie',
				description:
					'The cookie string to send along with the request. Should be URL-encoded. Use this parameter to send custom cookies along with the request made. It will be sent in the cookie HTTP Header made by the platform.',
				type: 'string',
				default: '',
				routing: {
					request: {
						qs: {
							cookie: '={{$value}}',
						},
					},
				},
			},
		],
	},
]

export const paginate: INodeProperties[] = [
	{
		displayName: 'Pagination',
		name: 'pagination',
		type: 'collection',
		default: {},
		description: 'Specify which page(s) of results to return',
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: ['gSearch'],
			},
			hide: {
				operation: ['gMapD']
			}
		},
		options: [
			{
				displayName: 'Page',
				name: 'page',
				description:
					'Determines the page of results to return. The effect of the page parameter depends on the value of the type parameter. For example, if type=reviews then the pageparameter determines the page of reviews to retrieve.',
				type: 'number',
				default: '',
				routing: {
					request: {
						qs: {
							page: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Max Page',
				name: 'max_page',
				description: 'The page number to paginate to',
				type: 'number',
				default: '',
				typeOptions:{
					maxValue:5
				},
				routing: {
					request: {
						qs: {
							max_page: '={{$value}}',
						},
					},
				},
			},
			{
				displayName: 'Number of Results',
				name: 'num',
				description: 'Determines the number of results shown per page',
				type: 'number',
				default: '',
				routing: {
					request: {
						qs: {
							num: '={{$value}}',
						},
					},
				},
			},
		],
	},
]
