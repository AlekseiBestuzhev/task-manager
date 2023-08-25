import { AppBar, Toolbar, IconButton, Typography, Button, LinearProgress } from '@mui/material';
import { selectIsLoggedIn } from 'features/auth/model/auth.selectors';
import { selectAppStatus } from 'app/model/app.selectors';
import { Menu } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { FC } from 'react';
import React from 'react';

type Props = {
	logout: () => void;
	title: string;
};

export const Header: FC<Props> = ({ logout, title }) => {
	const isLoggedIn = useSelector(selectIsLoggedIn);

	const status = useSelector(selectAppStatus);

	return (
		<AppBar position="static">
			<Toolbar>
				<IconButton edge="start" color="inherit" aria-label="menu">
					<Menu />
				</IconButton>
				<Typography variant="h6">{title}</Typography>
				{isLoggedIn && (
					<Button color="inherit" onClick={logout} sx={{ marginLeft: 'auto' }}>
						Log out
					</Button>
				)}
			</Toolbar>
			{status === 'loading' && <LinearProgress />}
		</AppBar>
	);
};
