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
import { selectIsLoggedIn } from 'features/auth/model/auth.selectors';

export const App = () => {
	const isInitialized = useSelector(selectIsInitialized);
	const isLoggedIn = useSelector(selectIsLoggedIn);

	const { initializeApp, logout } = useActions(authThunks);

	useEffect(() => {
		initializeApp();
	}, []);

	if (!isInitialized) return <Loading />;

	return (
		<div className="app">
			<ErrorSnackbar />
			<Header isLoggedIn={isLoggedIn} logout={logout} title="List Manager" />
			<Container fixed>
				<AppRouter isLoggedIn={isLoggedIn} />
			</Container>
		</div>
	);
};
