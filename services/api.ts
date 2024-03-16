import useSWR, { SWRResponse } from 'swr';
import useSWRMutation from 'swr/mutation';

import { fetcher } from '@/services/fetcher';
import {
	AppsConfigResponse,
	IAppConfigParams,
	IDeleteAppConfigParams,
	IDeleteServerConfigParams,
	IServerConfigParams,
	IServerConfigResponse,
} from './api-payload';
import { any } from 'zod';

export interface IErrorResponse {
	response?: {
		data: {
			error: string;
		};
		status: number;
	};
}
export const useGetAppsConfig = () => {
	const { data, isLoading, error, mutate }: SWRResponse<AppsConfigResponse> = useSWR(
		`/v1/settings/apps/all`,
		(url) =>
			fetcher({
				url,
				method: 'GET',
			}),
	);
	return { data, isLoading, error, mutate };
};
export const useCreateAppConfig = () => {
	const { trigger, isMutating, data, error } = useSWRMutation(
		`/v1/settings/apps/create`,
		(url, { arg }: { arg: IAppConfigParams }) => {
			return fetcher({
				url,
				arg,
			});
		},
	);
	return { trigger, data, isMutating, error };
};
export const useUpdateAppConfig = () => {
	const { trigger, isMutating, data, error } = useSWRMutation(
		`/v1/settings/apps/update`,
		(url, { arg }: { arg: IAppConfigParams }) => {
			return fetcher({
				url,
				arg,
			});
		},
	);
	return { trigger, data, isMutating, error };
};
export const useDeleteAppConfig = () => {
	const { trigger, isMutating, data, error } = useSWRMutation(
		`/v1/settings/apps/delete`,
		(url, { arg }: { arg: IDeleteAppConfigParams }) => {
			return fetcher({
				url,
				arg,
			});
		},
	);
	return { trigger, data, isMutating, error };
};
export const useGetServerConfig = () => {
	const { data, isLoading, error, mutate }: SWRResponse<IServerConfigResponse> = useSWR(
		`/v1/settings/server/all`,
		(url) =>
			fetcher({
				url,
				method: 'GET',
			}),
	);
	return { data, isLoading, error, mutate };
};
export const useCreateServerConfig = () => {
	const { trigger, isMutating, data, error } = useSWRMutation(
		`/v1/settings/server/create`,
		(url, { arg }: { arg: IServerConfigParams }) => {
			return fetcher({
				url,
				arg,
			});
		},
	);
	return { trigger, data, isMutating, error };
};
export const useUpdateServerConfig = () => {
	const { trigger, isMutating, data, error } = useSWRMutation(
		`/v1/settings/server/update`,
		(url, { arg }: { arg: IServerConfigParams }) => {
			return fetcher({
				url,
				arg,
			});
		},
	);
	return { trigger, data, isMutating, error };
};
export const useDeleteServerConfig = () => {
	const { trigger, isMutating, data, error } = useSWRMutation(
		`/v1/settings/server/delete`,
		(url, { arg }: { arg: IDeleteServerConfigParams }) => {
			return fetcher({
				url,
				arg,
			});
		},
	);
	return { trigger, data, isMutating, error };
};


export const GetNextTest = (arg?: Record<string, unknown>) => {
	const { data, isLoading, error, mutate }: SWRResponse<IServerConfigResponse> = useSWR(
		`/v1/next_test`,
		(url) =>
			fetcher({
				url,
				arg,
				method:"POST"
			}),
	);
	return { data, isLoading, error, mutate };
};