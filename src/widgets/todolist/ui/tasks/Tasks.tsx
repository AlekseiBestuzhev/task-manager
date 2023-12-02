import { TodolistDomainType } from 'features/todolists-management/model/todolists.slice';
import { TaskType } from 'features/tasks-management/api/tasks.api.types';
import {useAutoAnimate} from "@formkit/auto-animate/react";
import { TaskStatuses } from 'shared/enums';
import { Task } from 'entities/task';
import { FC } from 'react';
import React from 'react';

type Props = {
	todolist: TodolistDomainType;
	tasks: TaskType[];
};

export const Tasks: FC<Props> = ({ tasks, todolist }) => {
	const [tasksRef] = useAutoAnimate<HTMLDivElement>()

	let tasksForTodolist = tasks;

	if (todolist.filter === 'active') {
		tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New);
	}

	if (todolist.filter === 'completed') {
		tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed);
	}

	return (
		<div className="task-list" ref={tasksRef}>
			{tasksForTodolist.length ? (
				tasksForTodolist.map((t) => <Task key={t.id} task={t} todolistId={todolist.id} />)
			) : (
				<p className="no-task">No tasks yet...</p>
			)}
		</div>
	);
};
