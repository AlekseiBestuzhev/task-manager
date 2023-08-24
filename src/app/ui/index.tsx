import { AppBar, Button, CircularProgress, Container, IconButton, LinearProgress, Toolbar, Typography } from '@mui/material';
import { selectAppStatus, selectIsInitialized } from 'app/model/app.selectors';
import { selectIsLoggedIn } from 'features/auth/model/auth.selectors';
import { authThunks } from 'features/auth/model/auth.slice';
import { ErrorSnackbar } from 'common/components';
import { Login, Menu } from '@mui/icons-material';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useActions } from 'common/hooks';
import React, { useEffect } from 'react';
import { Main } from 'pages/main';
import './App.css';

export const App = () => {
	const status = useSelector(selectAppStatus);
	const isInitialized = useSelector(selectIsInitialized);
	const isLoggedIn = useSelector(selectIsLoggedIn);

	const { initializeApp, logout } = useActions(authThunks);

	useEffect(() => {
		initializeApp();
	}, []);

	const logoutHandler = () => logout();

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
			<AppBar position="static">
				<Toolbar>
					<IconButton edge="start" color="inherit" aria-label="menu">
						<Menu />
					</IconButton>
					<Typography variant="h6">News</Typography>
					{isLoggedIn && (
						<Button color="inherit" onClick={logoutHandler}>
							Log out
						</Button>
					)}
				</Toolbar>
				{status === 'loading' && <LinearProgress />}
			</AppBar>

			<Container fixed>
				<Routes>
					<Route path={'/'} element={<Main />} />
					<Route path={'/login'} element={<Login />} />
				</Routes>
			</Container>
		</div>
	);
};
