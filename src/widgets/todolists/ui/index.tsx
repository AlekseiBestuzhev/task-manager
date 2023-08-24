import { TodolistDomainType } from 'widgets/todolists/model/todolists.slice';
import { FilterTasksButtons } from 'entities/filter-tasks-buttons';
import React, { FC, memo, useCallback, useEffect } from 'react';
import { tasksThunks } from 'widgets/tasks/model/tasks.slice';
import { TaskType } from 'widgets/tasks/api/tasks.api.types';
import { TodolistTitle } from 'entities/todolist-title';
import { AddItemForm } from 'common/components';
import { useActions } from 'common/hooks';
import { Tasks } from 'widgets/tasks/ui';

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
