import { selectIsInitialized } from 'app/model/app.selectors';
import { authThunks } from 'features/auth/model/auth.slice';
import { CircularProgress, Container } from '@mui/material';
import { Header } from 'common/components/Header/Header';
import { ErrorSnackbar } from 'common/components';
import { AppRouter } from 'app/providers/router';
import { useSelector } from 'react-redux';
import { useActions } from 'common/hooks';
import React, { useEffect } from 'react';
import './App.css';

export const App = () => {
	const isInitialized = useSelector(selectIsInitialized);

	const { initializeApp, logout } = useActions(authThunks);

	useEffect(() => {
		initializeApp();
	}, []);

	if (!isInitialized) {
		return (
			<div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
				<CircularProgress />
			</div>
		);
	}

	return (
		<div className="App">
			<ErrorSnackbar />
			<Header logout={logout} />
			<Container fixed>
				<AppRouter />
			</Container>
		</div>
	);
};
