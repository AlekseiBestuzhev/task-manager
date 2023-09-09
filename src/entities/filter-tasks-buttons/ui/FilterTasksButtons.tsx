import { FilterValuesType, TodolistDomainType, todolistsActions } from 'features/todolists-management/model/todolists.slice';
import { useActions } from 'shared/hooks';
import { Button } from '@mui/material';
import React, { FC } from 'react';

type Props = {
	todolist: TodolistDomainType;
};

export const FilterTasksButtons: FC<Props> = ({ todolist }) => {
	const { changeTodolistFilter } = useActions(todolistsActions);

	const changeTasksFilterHandler = (filter: FilterValuesType) => () => {
		changeTodolistFilter({ id: todolist.id, filter });
	};

	const filterAllColor = todolist.filter === 'all' ? 'primary' : 'inherit';
	const filterActiveColor = todolist.filter === 'active' ? 'error' : 'inherit';
	const filterCompletedColor = todolist.filter === 'completed' ? 'success' : 'inherit';

	return (
		<div className="filter-block">
			<Button variant="contained" size="small" onClick={changeTasksFilterHandler('all')} color={filterAllColor}>
				All
			</Button>
			<Button variant="contained" size="small" onClick={changeTasksFilterHandler('active')} color={filterActiveColor}>
				Active
			</Button>
			<Button variant="contained" size="small" onClick={changeTasksFilterHandler('completed')} color={filterCompletedColor}>
				Completed
			</Button>
		</div>
	);
};
