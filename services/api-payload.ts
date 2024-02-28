/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IConfig {
	description: string;
	jsonvalue: string;
	keystr: string;
}
export interface ICategoryConfig {
	category: string;
	configs: IConfig[];
}
export interface AppsConfigResponse extends Array<ICategoryConfig> {}
export interface IAppConfigParams {
	keystr: string;
	category: string;
	description: string;
	jsonvalue: string;
	[key: string]: any;
}
export interface IDeleteAppConfigParams {
	keystr: string;
	[key: string]: any;
}
export interface IServerConfig {
	description: string;
	jsonvalue: string;
	keystr: string;
}
export interface IServerConfigResponse extends Array<IServerConfig> {}
export interface IServerConfigParams {
	keystr: string;
	description: string;
	jsonvalue: string;
	[key: string]: any;
}
export interface IDeleteServerConfigParams {
	keystr: string;
	[key: string]: any;
}
