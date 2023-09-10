import { Loading } from 'shared/components/Loading/Loading';
import { Routes, Route, Navigate } from 'react-router-dom';
import React, { FC, memo, lazy, Suspense } from 'react';
import { Login } from 'pages/login';

const Main = lazy(() => import('pages/main'));

type PropsType = {
	isLoggedIn: boolean;
};

export const AppRouter: FC<PropsType> = memo(({ isLoggedIn }) => {
	return (
		<Routes>
			{isLoggedIn ? (
				<>
					<Route
						path={'/'}
						element={
							<Suspense fallback={<Loading />}>
								<Main />
							</Suspense>
						}
					/>
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
});
