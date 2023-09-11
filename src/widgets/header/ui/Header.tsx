import { AppBar, Toolbar, IconButton, Typography, Button, LinearProgress } from '@mui/material';
import { selectAppStatus } from 'app/model/app.selectors';
import { Menu } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { FC, memo } from 'react';
import React from 'react';

type Props = {
	isLoggedIn: boolean;
	logout: () => void;
	title: string;
	openModal: () => void;
	openSidebar: () => void;
};

export const Header: FC<Props> = memo(({ isLoggedIn, logout, title, openModal, openSidebar }) => {
	const status = useSelector(selectAppStatus);

	return (
		<AppBar position="fixed">
			<Toolbar>
				<IconButton edge="start" color="inherit" aria-label="menu" onClick={openSidebar}>
					<Menu />
				</IconButton>
				<Typography variant="h6" className="app-title">
					{title}
				</Typography>
				{isLoggedIn && (
					<>
						<Button variant="outlined" color="inherit" onClick={openModal} sx={{ marginLeft: '3rem' }}>
							Create List
						</Button>
						<Button color="inherit" onClick={logout} sx={{ marginLeft: 'auto' }}>
							Log out
						</Button>
					</>
				)}
			</Toolbar>
			{status === 'loading' && <LinearProgress />}
		</AppBar>
	);
});
