import { selectTodolists } from 'features/todolists-management/model/todolists.selectors';
import { todolistsThunks } from 'features/todolists-management/model/todolists.slice';
import { selectTasks } from 'features/tasks-management/model/tasks.selectors';
import React, { useCallback, useEffect } from 'react';
import { AddItemForm } from 'shared/components';
import { Todolist } from 'widgets/todolist';
import { Grid, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { useActions } from 'shared/hooks';

export const Main = () => {
	const todolists = useSelector(selectTodolists);

	const tasks = useSelector(selectTasks);

	const { addTodolist, fetchTodolists } = useActions(todolistsThunks);

	useEffect(() => {
		fetchTodolists();
	}, []);

	const addTodolistCallback = useCallback((title: string) => {
		return addTodolist(title).unwrap();
	}, []);

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
