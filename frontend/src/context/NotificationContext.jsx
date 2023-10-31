import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

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
		setState({ open: true, body, severity: 'error' });
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
			<Snackbar
				open={state.open}
				autoHideDuration={6000}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			>
				<MuiAlert
					elevation={6}
					variant="filled"
					onClose={handleClose}
					severity={state.severity || 'success'}
				>
					{state.body}
				</MuiAlert>
			</Snackbar>
		</NotificationContext.Provider>
	);
}

NotificationProvider.propTypes = {
	children: PropTypes.node,
};

export const useNotifications = () => React.useContext(NotificationContext);