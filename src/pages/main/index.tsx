import { selectTodolists } from 'widgets/todolists/model/todolists.selectors';
import { todolistsThunks } from 'widgets/todolists/model/todolists.slice';
import { selectIsLoggedIn } from 'features/auth/model/auth.selectors';
import { selectTasks } from 'widgets/tasks/model/tasks.selectors';
import { Todolist } from 'widgets/todolists/ui/Todolist/todolist';
import React, { useCallback, useEffect } from 'react';
import { AddItemForm } from 'common/components';
import { Navigate } from 'react-router-dom';
import { Grid, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { useActions } from 'common/hooks';

export const Main = () => {
	const todolists = useSelector(selectTodolists);
	const tasks = useSelector(selectTasks);
	const isLoggedIn = useSelector(selectIsLoggedIn);

	const { addTodolist, fetchTodolists } = useActions(todolistsThunks);

	useEffect(() => {
		if (!isLoggedIn) {
			return;
		}
		fetchTodolists();
	}, []);

	const addTodolistCallback = useCallback((title: string) => {
		return addTodolist(title).unwrap();
	}, []);

	if (!isLoggedIn) {
		return <Navigate to={'/login'} />;
	}

	return (
		<>
			<Grid container style={{ padding: '20px' }}>
				<AddItemForm addItem={addTodolistCallback} />
			</Grid>
			<Grid container spacing={3}>
				{todolists.map((tl) => {
					let allTodolistTasks = tasks[tl.id];

					return (
						<Grid item key={tl.id}>
							<Paper style={{ padding: '10px' }}>
								<Todolist todolist={tl} tasks={allTodolistTasks} />
							</Paper>
						</Grid>
					);
				})}
			</Grid>
		</>
	);
};
