import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';

import { login, register } from '../services/auth.service';
import { useNotifications } from './NotificationContext';

const initialState = {
	user: null,
	token: null,
	loading: true,
	loggedin: undefined,
	error: '',
};

const AuthContext = React.createContext(initialState);

export const AuthProvider = ({ children }) => {
	const [state, setState] = useState(initialState);
	const { actions: notify } = useNotifications();
	const navigate = useNavigate();

	useEffect(() => {
		if (!state.loggedin) localStorage.removeItem('_connectedUser');
		else localStorage.setItem('_connectedUser', JSON.stringify(state.user));
		setState({ ...state, loading: false });
	}, [state.loggedin]);

	useLayoutEffect(() => {
		const storedUser = JSON.parse(localStorage.getItem('_connectedUser'));
		if (storedUser == null) setState({ ...state, loggedin: false, error: '' });
		else setState({ ...state, user: storedUser, token: storedUser, loggedin: true, error: '' });
	}, []);

	// Actions
	const loginWithUsernameAndPassword = async ({ username, password, isVolunteer }) => {
		setState({
			...state,
			loading: true,
		});
		try {
			const result = await login({
				username,
				password,
				isVolunteer
			});

			console.log(result)

			if (result.success) {
				setState({
					...state,
					user: result.user,
					token: result.user,
					loading: false,
					loggedin: true,
					error: '',
				});
				navigate('/');
			} else {
				notify?.error(result.message);
				setState({
					...state,
					loading: false,
					loggedin: false,
					error: result.message,
				});
			}
		} catch (err) {
			console.log(err)
			setState({
				...state,
				loading: false,
				loggedin: false,
				error: err?.response?.data?.message || err.message,
			});
			notify?.error(err?.response?.data?.message || err.message);
		}
	};

	const registerWithUsernameAndPassword = async ({ username, password, is }) => {
		setState({
			...state,
			loading: true,
		});
		try {
			const result = await register({
				username,
				password,
			});

			if (result.success) {
				setState({
					...state,
					user: result.user,
					token: result.user,
					loading: false,
					loggedin: true,
					error: '',
				});
				navigate('/');
			} else {
				notify?.error(result.message);
				setState({
					...state,
					loading: false,
					loggedin: false,
					error: result.message,
				});
			}
		} catch (err) {
			setState({
				...state,
				loading: false,
				loggedin: false,
				error: err?.response?.data?.message || err.message,
			});
			notify?.error(err?.response?.data?.message || err.message);
		}
	};

	const logout = async () => {
		localStorage.removeItem('_connectedUser');
		setState(initialState);
	};

	const authToken = () => state.token;
	return (
		<AuthContext.Provider
			value={{
				...state,
				actions: {
					loginWithUsernameAndPassword,
					registerWithUsernameAndPassword,
					logout,
					authToken,
				},
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

AuthProvider.propTypes = {
	children: PropTypes.node,
};

// Hook to be able to access this context
export const useAuth = () => React.useContext(AuthContext);