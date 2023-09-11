import { Close } from '@mui/icons-material';
import { IconButton, Link } from '@mui/material';
import clsx from 'clsx';
import React, { FC } from 'react';

type PropsType = {
	open: boolean;
	onClose: () => void;
};

export const Sidebar: FC<PropsType> = ({ open, onClose }) => {
	const classes = clsx('sidebar', open && 'sidebar-open');

	return (
		<>
			{open && <div className="sidebar-background" onClick={onClose} />}
			<aside className={classes}>
				<IconButton color="inherit" aria-label="close" onClick={onClose} sx={{ alignSelf: 'flex-end' }}>
					<Close />
				</IconButton>
				<div className="sidebar-content">
					<div>
						<p>The application is designed for creating and managing task lists. You can set for each task:</p>
						<ul>
							<li>title</li>
							<li>description</li>
							<li>order</li>
							<li>status</li>
							<li>start date</li>
							<li>deadline</li>
							<li>priority</li>
						</ul>
						<p>Just click on the task name and set the required values in the window that appears.</p>
					</div>
					<div className="sidebar-links">
						<Link href="https://github.com/AlekseiBestuzhev/">My GitHub</Link>
						<Link href="https://social-network.samuraijs.com/docs?type=todolist">Todolist API Docs</Link>
						<Link href="https://mui.com/material-ui/">Material UI Docs</Link>
					</div>
				</div>
			</aside>
		</>
	);
};
