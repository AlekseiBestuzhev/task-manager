import { tasksThunks } from 'widgets/tasks/model/tasks.slice';
import { TaskType } from 'widgets/tasks/api/tasks.api.types';
import IconButton from '@mui/material/IconButton';
import { EditableSpan } from 'common/components';
import Checkbox from '@mui/material/Checkbox';
import { ChangeEvent, FC, memo } from 'react';
import { Delete } from '@mui/icons-material';
import { TaskStatuses } from 'common/enums';
import { useActions } from 'common/hooks';
import s from './task.module.css';
import React from 'react';

type Props = {
	task: TaskType;
	todolistId: string;
};

export const Task: FC<Props> = memo(({ task, todolistId }) => {
	const { removeTask, updateTask } = useActions(tasksThunks);

	const removeTaskHandler = () => {
		removeTask({ taskId: task.id, todolistId });
	};

	const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
		let newIsDoneValue = e.currentTarget.checked;
		const status = newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New;
		updateTask({ taskId: task.id, domainModel: { status }, todolistId });
	};

	const changeTitleHandler = (title: string) => {
		updateTask({ taskId: task.id, domainModel: { title }, todolistId });
	};

	return (
		<div key={task.id} className={task.status === TaskStatuses.Completed ? s.isDone : ''}>
			<Checkbox checked={task.status === TaskStatuses.Completed} color="primary" onChange={changeStatusHandler} />

			<EditableSpan value={task.title} onChange={changeTitleHandler} />
			<IconButton onClick={removeTaskHandler}>
				<Delete />
			</IconButton>
		</div>
	);
});
