import { selectIsInitialized } from 'app/model/app.selectors';
import { authThunks } from 'features/auth/model/auth.slice';
import { Loading } from 'common/components/Loading/Loading';
import { Header } from 'common/components/Header/Header';
import { ErrorSnackbar } from 'common/components';
import { AppRouter } from 'app/providers/router';
import { Container } from '@mui/material';
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
