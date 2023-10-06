import { TaskType } from 'features/tasks-management/api/tasks.api.types';
import { Button, TextField, Typography } from '@mui/material';
import { Modal } from 'shared/components';
import React, { FC } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type Props = {
	onClose: () => void;
	open: boolean;
	title: string;
	task: TaskType;
};

export const TaskModal: FC<Props> = ({ onClose, open, title, task }) => {
	return (
		<Modal onClose={onClose} open={open} title={title}>
			<form className="task-info">
				<div className="task-info__created">
					<span>Creted:</span> <span>{new Date(task.addedDate).toLocaleString()}</span>
				</div>
				<TextField value={task.title} label="Task title" />
				<div className="task-info__select-group">
					<FormControl className="select">
						<InputLabel id="demo-simple-select-label" className="select__label">
							Status
						</InputLabel>
						<Select labelId="demo-simple-select-label" id="demo-simple-select" value={task.status} label="Age">
							<MenuItem value={10}>Ten</MenuItem>
							<MenuItem value={20}>Twenty</MenuItem>
							<MenuItem value={30}>Thirty</MenuItem>
						</Select>
					</FormControl>
					<FormControl className="select">
						<InputLabel id="priority-select-label" className="select__label">
							Priority
						</InputLabel>
						<Select labelId="priority-select-label" id="priority-select" value={task.priority} label="Age">
							<MenuItem value={10}>Ten</MenuItem>
							<MenuItem value={20}>Twenty</MenuItem>
							<MenuItem value={30}>Thirty</MenuItem>
						</Select>
					</FormControl>
				</div>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DemoContainer components={['DatePicker', 'DatePicker']}>
						<DatePicker label="Start date" value={task.startDate} />
						<DatePicker label="Deadline" value={task.deadline} />
					</DemoContainer>
				</LocalizationProvider>
				<TextField value={task.description} label="Description" multiline />
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
