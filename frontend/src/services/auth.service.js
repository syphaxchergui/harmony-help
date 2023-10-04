import { apiService } from './api.service';

export const login = ({ username, password }) => {
	return apiService.post('/auth/login', {
		username,
		password,
	});
};

export const register = ({ username, password }) => {
	return apiService.post('/auth/register', {
		username,
		password,
	});
};