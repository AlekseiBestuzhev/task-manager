import { AppBar, Toolbar, IconButton, Typography, Button, LinearProgress } from '@mui/material';
import { selectIsLoggedIn } from 'features/auth/model/auth.selectors';
import { selectAppStatus } from 'app/model/app.selectors';
import { Menu } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { FC } from 'react';
import React from 'react';

type Props = {
	logout: () => void;
};

export const Header: FC<Props> = ({ logout }) => {
	const isLoggedIn = useSelector(selectIsLoggedIn);

	const status = useSelector(selectAppStatus);

	return (
		<AppBar position="static">
			<Toolbar>
				<IconButton edge="start" color="inherit" aria-label="menu">
					<Menu />
				</IconButton>
				<Typography variant="h6">News</Typography>
				{isLoggedIn && (
					<Button color="inherit" onClick={logout}>
						Log out
					</Button>
				)}
			</Toolbar>
			{status === 'loading' && <LinearProgress />}
		</AppBar>
	);
};
