import { TodolistDomainType, todolistsThunks } from 'features/todolists-management/model/todolists.slice';
import { EditableSpan } from 'shared/components';
import React, { FC, useCallback } from 'react';
import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useActions } from 'shared/hooks';

type Props = {
	todolist: TodolistDomainType;
};

export const TodolistTitle: FC<Props> = ({ todolist }) => {
	const { removeTodolist, changeTodolistTitle } = useActions(todolistsThunks);

	const removeTodolistHandler = () => {
		removeTodolist(todolist.id);
	};

	const changeTodolistTitleCallback = useCallback(
		(title: string) => {
			changeTodolistTitle({ id: todolist.id, title });
		},
		[todolist.id]
	);

	return (
		<h3>
			<EditableSpan value={todolist.title} onChange={changeTodolistTitleCallback} />
			<IconButton onClick={removeTodolistHandler} disabled={todolist.entityStatus === 'loading'}>
				<Delete />
			</IconButton>
		</h3>
	);
};
