import React, { ChangeEvent, FC, memo, useState } from 'react';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';

export type AddItemFormType = {
	addItem: (title: string) => void;
	placeholder?: string;
	disabled?: boolean;
};

export const AddItemForm: FC<AddItemFormType> = memo(({ addItem, placeholder, disabled }) => {
	const [error, setError] = useState<boolean>(false);
	const [title, setTitle] = useState<string>('');

	const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
		error && setError(false);
		setTitle(e.currentTarget.value);
	};

	const trimmedTitle = title.trim();

	const addNewItem = () => {
		if (trimmedTitle) {
			addItem(trimmedTitle);
		} else {
			setError(true);
		}
		setTitle('');
	};

	const onKeyDownAdd = (e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addNewItem();

	const inputLabelText = error ? 'Title is required' : placeholder;
	const buttonColor = title ? 'primary' : 'inherit';

	return (
		<div className="add-item-form">
			<TextField
				id="outlined-basic"
				label={inputLabelText}
				variant="outlined"
				size="small"
				value={title}
				onKeyDown={onKeyDownAdd}
				onChange={onChangeInputHandler}
				error={error}
				disabled={disabled}
				sx={{ flexGrow: '1' }}
			/>
			<Button
				variant="contained"
				color={buttonColor}
				onClick={addNewItem}
				disabled={disabled}
				sx={{ minWidth: '44px', width: '44px' }}
			>
				<AddIcon />
			</Button>
		</div>
	);
});
