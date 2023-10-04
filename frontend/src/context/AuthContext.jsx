import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';

import useToken from '../hooks/useToken';
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
	const [storedToken, storeToken] = useToken('_token');
	const { actions: notify } = useNotifications();
	const navigate = useNavigate();

	useEffect(() => {
		if (!state.loggedin) storeToken({ user: undefined, token: undefined });
		else storeToken({ user: state.user, token: state.token });
		setState({ ...state, loading: false });
	}, [state.loggedin]);

	useLayoutEffect(() => {
		if (storedToken?.user == undefined && storedToken?.token == undefined)
			setState({ ...state, loggedin: false, error: '' });
		else setState({ ...storedToken, loggedin: true, error: '' });
	}, []);

	// Actions
	const loginWithUsernameAndPassword = async ({ username, password }) => {
		setState({
			...state,
			loading: true,
		});
		try {
			const result = await login({
				username,
				password,
			});

			if (result.data.success) {
				setState({
					...state,
					user: result.data.user,
					token: result.data.token,
					loading: false,
					loggedin: true,
					error: '',
				});
				navigate('/');
			} else {
				notify?.error(result.data.message);
				setState({
					...state,
					loading: false,
					loggedin: false,
					error: result.data.message,
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

	const registerWithUsernameAndPassword = async ({ username, password }) => {
		setState({
			...state,
			loading: true,
		});
		try {
			const result = await register({
				username,
				password,
			});

			if (result.data.success) {
				setState({
					...state,
					user: result.data.user,
					token: result.data.token,
					loading: false,
					loggedin: true,
					error: '',
				});
				navigate('/');
			} else {
				notify?.error(result.data.message);
				setState({
					...state,
					loading: false,
					loggedin: false,
					error: result.data.message,
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