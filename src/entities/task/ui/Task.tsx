import { tasksThunks } from 'features/tasks-management/model/tasks.slice';
import { TaskType } from 'features/tasks-management/api/tasks.api.types';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import IconButton from '@mui/material/IconButton';
import { EditableSpan } from 'shared/components';
import Checkbox from '@mui/material/Checkbox';
import { ChangeEvent, FC, memo } from 'react';
import { TaskStatuses } from 'shared/enums';
import { useActions } from 'shared/hooks';
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
		return updateTask({ taskId: task.id, domainModel: { title }, todolistId }).unwrap();
	};

	const classes = `task ${task.status === TaskStatuses.Completed ? 'task-done' : ''}`;

	return (
		<div key={task.id} className={classes}>
			<Checkbox checked={task.status === TaskStatuses.Completed} color="primary" onChange={changeStatusHandler} />
			<div className="task-with-icon">
				<EditableSpan value={task.title} onChange={changeTitleHandler} />
				<IconButton onClick={removeTaskHandler}>
					<RemoveCircleIcon style={{ opacity: '0.4' }} />
				</IconButton>
			</div>
		</div>
	);
});
