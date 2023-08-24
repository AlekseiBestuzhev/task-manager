import { TodolistDomainType } from 'widgets/todolists/model/todolists.slice';
import { TaskType } from 'widgets/tasks/api/tasks.api.types';
import { TaskStatuses } from 'common/enums';
import { Task } from 'entities/task';
import { FC } from 'react';
import React from 'react';

type Props = {
	todolist: TodolistDomainType;
	tasks: TaskType[];
};

export const Tasks: FC<Props> = ({ tasks, todolist }) => {
	// const tasks = useAppSelector(selectTasks)[todolistId]
	let tasksForTodolist = tasks;

	if (todolist.filter === 'active') {
		tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New);
	}

	if (todolist.filter === 'completed') {
		tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed);
	}

	return (
		<>
			{tasksForTodolist.map((t) => (
				<Task key={t.id} task={t} todolistId={todolist.id} />
			))}
		</>
	);
};
