import { selectIsInitialized } from 'app/model/app.selectors';
import { authThunks } from 'features/auth/model/auth.slice';
import { Loading } from 'shared/components/Loading/Loading';
import { ErrorSnackbar } from 'shared/components';
import { AppRouter } from 'app/providers/router';
import { Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { useActions } from 'shared/hooks';
import React, { useEffect } from 'react';
import { Header } from 'widgets/header';
import './App.css';

export const App = () => {
	const isInitialized = useSelector(selectIsInitialized);

	const { initializeApp, logout } = useActions(authThunks);

	useEffect(() => {
		initializeApp();
	}, []);

	return isInitialized ? (
		<div className="App">
			<ErrorSnackbar />
			<Header logout={logout} title="List Manager" />
			<Container fixed>
				<AppRouter />
			</Container>
		</div>
	) : (
		<Loading />
	);
};
