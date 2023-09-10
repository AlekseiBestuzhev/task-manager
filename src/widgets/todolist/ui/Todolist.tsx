import { TodolistDomainType } from 'features/todolists-management/model/todolists.slice';
import { selectTasks } from 'features/tasks-management/model/tasks.selectors';
import { tasksThunks } from 'features/tasks-management/model/tasks.slice';
import { FilterTasksButtons } from 'entities/filter-tasks-buttons';
import { TodolistTitle } from 'entities/todolist-title';
import React, { FC, memo, useCallback } from 'react';
import { AddItemForm } from 'shared/components';
import { Grid, Paper } from '@mui/material';
import { useActions } from 'shared/hooks';
import { useSelector } from 'react-redux';
import { Tasks } from 'widgets/todolist';

type Props = {
	todolist: TodolistDomainType;
};

export const Todolist: FC<Props> = memo(({ todolist }) => {
	const tasks = useSelector(selectTasks)[todolist.id];

	const { addTask } = useActions(tasksThunks);

	const addTaskCallBack = useCallback((title: string) => {
		return addTask({ title, todolistId: todolist.id }).unwrap();
	}, []);

	const disabled = todolist.entityStatus === 'loading';

	return (
		<Grid item>
			<Paper elevation={2} style={{ padding: '1.5rem 1rem' }}>
				<TodolistTitle todolist={todolist} />
				<AddItemForm addItem={addTaskCallBack} disabled={disabled} placeholder="Enter task title" />
				<Tasks todolist={todolist} tasks={tasks} />
				<div style={{ paddingTop: '10px' }}>
					<FilterTasksButtons todolist={todolist} />
				</div>
			</Paper>
		</Grid>
	);
});
