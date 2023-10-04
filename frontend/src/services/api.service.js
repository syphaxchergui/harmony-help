import axios from 'axios';

const axiosConfig = {
	baseURL: 'http://localhost:5000/api',
	timeout: 30000,
};

export const apiService = axios.create(axiosConfig);

export const apiServiceWithToken = axios.create(axiosConfig);

apiServiceWithToken.interceptors.request.use(
	function (config) {
		const { token } = JSON.parse(localStorage.getItem('_token') ?? '{}');

		if (!token) return config;
		return {
			...config,
			headers: { ...config.headers, 'x-access-token': token },
		};
	},
	function (error) {
		return Promise.reject(error);
	}
);

apiServiceWithToken.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response.status == 401) {
			localStorage.setItem('_token', { user: undefined, token: undefined });
			window.location.reload(false);
		}
	}
);