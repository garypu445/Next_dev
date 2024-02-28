import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_HTTP_DOMAIN;

export const API = axios.create({
	baseURL,
	headers: {
		'Content-Type': 'application/json',
	},
});

export const fetcher = async ({
	url,
	arg,
	method = 'POST',
}: {
	url: string;
	method?: 'POST' | 'GET' | 'DELETE' | 'PATCH';
	arg?: Record<string, unknown>;
}) => {
	return API.request({
		url,
		method,
		data: arg,
	}).then((res) => res.data);
};
