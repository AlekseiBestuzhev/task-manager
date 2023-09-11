import { todolistsThunks } from 'features/todolists-management/model/todolists.slice';
import { AddItemForm, Modal } from 'shared/components';
import React, { FC, useCallback } from 'react';
import { Typography } from '@mui/material';
import { useActions } from 'shared/hooks';

type Props = {
	onClose: () => void;
	open: boolean;
};

export const CreateListModal: FC<Props> = ({ onClose, open }) => {
	const { addTodolist } = useActions(todolistsThunks);

	const addTodolistCallback = useCallback((title: string) => {
		return addTodolist(title).unwrap();
	}, []);

	return (
		<Modal onClose={onClose} open={open} title="Create list">
			<AddItemForm addItem={addTodolistCallback} placeholder="Enter list tilte" closeHandler={onClose} />
			<Typography variant="body1" sx={{ maxWidth: '400px', paddingTop: '24px' }}>
				Create new list and fill it tasks with description, priority, deadlines and so on...
			</Typography>
		</Modal>
	);
};
