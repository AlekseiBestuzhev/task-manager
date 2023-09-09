import { todolistsThunks } from 'features/todolists-management/model/todolists.slice';
import { TodolistList } from './TodolistList/TodolistList';
import React, { useCallback, useEffect } from 'react';
import { AddItemForm } from 'shared/components';
import { useActions } from 'shared/hooks';
import { Grid } from '@mui/material';

export const Main = () => {
	const { addTodolist, fetchTodolists } = useActions(todolistsThunks);

	useEffect(() => {
		fetchTodolists();
	}, []);

	const addTodolistCallback = useCallback((title: string) => {
		return addTodolist(title).unwrap();
	}, []);

	console.log('main render');

	return (
		<>
			<Grid container style={{ padding: '20px' }}>
				<AddItemForm addItem={addTodolistCallback} placeholder="Enter list tilte" />
			</Grid>
			<Grid container spacing={3}>
				<TodolistList />
			</Grid>
		</>
	);
};
