import { IconButton, Typography } from '@mui/material';
import React, { FC, PropsWithChildren } from 'react';
import { Close } from '@mui/icons-material';
import Dialog from '@mui/material/Dialog';

type Props = {
	onClose: () => void;
	open: boolean;
	title: string;
} & PropsWithChildren;

export const Modal: FC<Props> = ({ onClose, open, children, title }) => {
	return (
		<Dialog onClose={onClose} open={open} sx={{ padding: '12px' }}>
			<div className="modal-header">
				<Typography variant="h5">{title}</Typography>
				<IconButton color="inherit" aria-label="close" onClick={onClose}>
					<Close />
				</IconButton>
			</div>
			<div className="modal-content">{children}</div>
		</Dialog>
	);
};
