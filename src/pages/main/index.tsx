import { selectTodolists } from 'features/todolists-management/model/todolists.selectors';
import { todolistsThunks } from 'features/todolists-management/model/todolists.slice';
import { Todolist } from 'widgets/todolist';
import { useActions } from 'shared/hooks';
import { useSelector } from 'react-redux';
import React, { useEffect } from 'react';

const Main = () => {
	const todolists = useSelector(selectTodolists);

	const { fetchTodolists } = useActions(todolistsThunks);

	useEffect(() => {
		fetchTodolists();
	}, []);

	return (
		<div className="lists-container">
			{todolists?.map((tl) => (
				<Todolist key={tl.id} todolist={tl} />
			))}
		</div>
	);
};

export default Main;
