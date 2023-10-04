import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NotificationContext = React.createContext();

export default function NotificationProvider({ children }) {
	const [state, setState] = useState({
		open: false,
		body: '',
	});

	const success = (body) => {
		setState({ open: true, body });
	};
	const error = (body) => {
		setState({ open: true, body });
	};
	const info = (body) => {
		setState({ open: true, body });
	};

	const handleClose = () => {
		setState({ ...state, open: false });
	};

	return (
		<NotificationContext.Provider
			value={{
				...state,
				actions: {
					error,
					success,
					info,
				},
			}}
		>
			{children}

		</NotificationContext.Provider>
	);
}

NotificationProvider.propTypes = {
	children: PropTypes.node,
};

export const useNotifications = () => React.useContext(NotificationContext);