import { selectTodolists } from 'features/todolists-management/model/todolists.selectors';
import { Todolist } from 'widgets/todolist';
import { useSelector } from 'react-redux';
import React from 'react';

export const TodolistList = () => {
	const todolists = useSelector(selectTodolists);

	return (
		<>
			{todolists?.map((tl) => (
				<Todolist key={tl.id} todolist={tl} />
			))}
		</>
	);
};
