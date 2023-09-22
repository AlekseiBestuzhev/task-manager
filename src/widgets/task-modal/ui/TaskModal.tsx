import { TaskType } from 'features/tasks-management/api/tasks.api.types';
import { Button, Typography } from '@mui/material';
import { Modal } from 'shared/components';
import React, { FC } from 'react';

type Props = {
	onClose: () => void;
	open: boolean;
	title: string;
	task: TaskType;
};

export const TaskModal: FC<Props> = ({ onClose, open, title, task }) => {
	return (
		<Modal onClose={onClose} open={open} title={title}>
			<Typography variant="body1" sx={{ maxWidth: '400px' }}>
				Get information about this task or change different data you can here...
			</Typography>
			<form className="task-info">
				<p>Title: {task.title}</p>
				<p>Status: {task.status}</p>
				<p>Priority: {task.priority}</p>
				<p>Added date: {new Date(task.addedDate).toLocaleString()}</p>
				<p>Start date: {task.startDate}</p>
				<p>Deadline: {task.deadline}</p>
				<p>Description: {task.description}</p>
				<div className="task-buttons">
					<Button variant="contained" color="inherit" onClick={onClose}>
						Cancel
					</Button>
					<Button variant="contained">Apply</Button>
				</div>
			</form>
		</Modal>
	);
};
