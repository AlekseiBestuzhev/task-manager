import { selectIsLoggedIn } from 'features/auth/model/auth.selectors';
import { selectIsInitialized } from 'app/model/app.selectors';
import { authThunks } from 'features/auth/model/auth.slice';
import { Loading } from 'shared/components/Loading/Loading';
import { AppRouter } from 'app/providers/router';
import { useSelector } from 'react-redux';
import { useActions } from 'shared/hooks';
import React, { useEffect } from 'react';
import { Layout } from 'widgets/layout';
import './App.css';

export const App = () => {
	const isInitialized = useSelector(selectIsInitialized);
	const isLoggedIn = useSelector(selectIsLoggedIn);

	const { initializeApp, logout } = useActions(authThunks);

	useEffect(() => {
		initializeApp();
	}, []);

	if (!isInitialized) return <Loading />;

	return (
		<Layout isLoggedIn={isLoggedIn} logout={logout}>
			<AppRouter isLoggedIn={isLoggedIn} />
		</Layout>
	);
};
