import { TodolistDomainType, todolistsThunks } from 'features/todolists-management/model/todolists.slice';
import { selectTodolistRemoving } from 'features/todolists-management/model/todolists.selectors';
import { EditableSpan } from 'shared/components';
import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useActions } from 'shared/hooks';
import { useSelector } from 'react-redux';
import React, { FC } from 'react';

type Props = {
	todolist: TodolistDomainType;
};

export const TodolistTitle: FC<Props> = ({ todolist }) => {
	const { removeTodolist, changeTodolistTitle } = useActions(todolistsThunks);

	const loadingList = useSelector(selectTodolistRemoving(todolist.id));

	const removeTodolistHandler = () => {
		removeTodolist(todolist.id);
	};

	const changeTodolistTitleCallback = (title: string) => {
		return changeTodolistTitle({ id: todolist.id, title }).unwrap();
	};

	return (
		<h3 className="list-title">
			<EditableSpan value={todolist.title} onChange={changeTodolistTitleCallback} disabled={loadingList} />
			<IconButton onClick={removeTodolistHandler} disabled={todolist.entityStatus === 'loading'}>
				<Delete />
			</IconButton>
		</h3>
	);
};
