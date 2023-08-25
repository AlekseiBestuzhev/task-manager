import { TodolistDomainType } from 'features/todolists-management/model/todolists.slice';
import { tasksThunks } from 'features/tasks-management/model/tasks.slice';
import { TaskType } from 'features/tasks-management/api/tasks.api.types';
import { FilterTasksButtons } from 'entities/filter-tasks-buttons';
import React, { FC, memo, useCallback, useEffect } from 'react';
import { TodolistTitle } from 'entities/todolist-title';
import { AddItemForm } from 'shared/components';
import { useActions } from 'shared/hooks';
import { Tasks } from 'widgets/todolist';

type Props = {
	todolist: TodolistDomainType;
	tasks: TaskType[];
};

export const Todolist: FC<Props> = memo(({ todolist, tasks }) => {
	const { fetchTasks, addTask } = useActions(tasksThunks);

	useEffect(() => {
		fetchTasks(todolist.id);
	}, []);

	const addTaskCallBack = useCallback(
		(title: string) => {
			return addTask({ title, todolistId: todolist.id }).unwrap();
		},
		[todolist.id]
	);

	return (
		<>
			<TodolistTitle todolist={todolist} />
			<AddItemForm addItem={addTaskCallBack} disabled={todolist.entityStatus === 'loading'} />
			<Tasks todolist={todolist} tasks={tasks} />
			<div style={{ paddingTop: '10px' }}>
				<FilterTasksButtons todolist={todolist} />
			</div>
		</>
	);
});
