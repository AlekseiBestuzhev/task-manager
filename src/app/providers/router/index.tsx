import { selectIsLoggedIn } from 'features/auth/model/auth.selectors';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Login } from 'pages/login';
import { Main } from 'pages/main';
import React from 'react';

export const AppRouter = () => {
	const isLoggedIn = useSelector(selectIsLoggedIn);

	return (
		<Routes>
			{isLoggedIn ? (
				<>
					<Route path={'/'} element={<Main />} />
					<Route path={'/login'} element={<Navigate to="/" />} />
				</>
			) : (
				<>
					<Route path={'/login'} element={<Login />} />
					<Route path={'/'} element={<Navigate to="/login" />} />
				</>
			)}
			<Route path={'/*'} element={<h1>Page not found</h1>} />
		</Routes>
	);
};
