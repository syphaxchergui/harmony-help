import { users } from '../utils/users';

export const login = ({ username, password, isVolunteer }) => {
	return new Promise((resolve, reject) => {
		const user = users.find(user => user.username === username && user.password === password && user.role === (isVolunteer ? 'benevole' : 'user'));
		if (user) {
			localStorage.setItem('_connectedUser', JSON.stringify(user));
			resolve({ success: true, user });
		} else {
			reject({ success: false, message: 'Invalid credentials' });
		}
	});
};

export const register = ({ username, password }) => {
	return new Promise((resolve, reject) => {
		const user = { id: Math.random().toString(36).substr(2, 9), username, password, score: 0 };
		users.push(user);
		localStorage.setItem('_connectedUser', JSON.stringify(user));
		resolve({ success: true });
	});
};