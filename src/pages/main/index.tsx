import { todolistsThunks } from 'features/todolists-management/model/todolists.slice';
import { TodolistList } from './TodolistList/TodolistList';
import React, { useEffect } from 'react';
import { useActions } from 'shared/hooks';
import { Grid } from '@mui/material';

const Main = () => {
	const { fetchTodolists } = useActions(todolistsThunks);

	useEffect(() => {
		fetchTodolists();
	}, []);

	return (
		<Grid container spacing={3}>
			<TodolistList />
		</Grid>
	);
};

export default Main;
