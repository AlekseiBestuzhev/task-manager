import { selectTodolists } from 'widgets/todolists/model/todolists.selectors';
import { todolistsThunks } from 'widgets/todolists/model/todolists.slice';
import { selectTasks } from 'widgets/tasks/model/tasks.selectors';
import React, { useCallback, useEffect } from 'react';
import { Todolist } from 'widgets/todolists/ui';
import { AddItemForm } from 'common/components';
import { Grid, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { useActions } from 'common/hooks';

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
