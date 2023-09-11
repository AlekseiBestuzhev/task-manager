import { selectIsLoggedIn } from 'features/auth/model/auth.selectors';
import { selectIsInitialized } from 'app/model/app.selectors';
import { CreateListModal } from 'widgets/create-list-modal';
import { authThunks } from 'features/auth/model/auth.slice';
import { Loading } from 'shared/components/Loading/Loading';
import React, { useEffect, useState } from 'react';
import { ErrorSnackbar } from 'shared/components';
import { AppRouter } from 'app/providers/router';
import { Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { useActions } from 'shared/hooks';
import { Header } from 'widgets/header';
import './App.css';

export const App = () => {
	const [modalOpen, setModalOpen] = useState(false);

	const isInitialized = useSelector(selectIsInitialized);
	const isLoggedIn = useSelector(selectIsLoggedIn);

	const { initializeApp, logout } = useActions(authThunks);

	useEffect(() => {
		initializeApp();
	}, []);

	if (!isInitialized) return <Loading />;

	return (
		<div className="app">
			<Header isLoggedIn={isLoggedIn} logout={logout} title="List Manager" openModal={() => setModalOpen(true)} />
			<CreateListModal onClose={() => setModalOpen(false)} open={modalOpen} />
			<Container fixed>
				<AppRouter isLoggedIn={isLoggedIn} />
			</Container>
			<ErrorSnackbar />
		</div>
	);
};
