import React, { ChangeEvent, FC, memo, useState } from 'react';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';

export type AddItemFormType = {
	addItem: (title: string) => Promise<any>;
	placeholder?: string;
	disabled?: boolean;
};

export const AddItemForm: FC<AddItemFormType> = memo(({ addItem, placeholder, disabled }) => {
	const [error, setError] = useState<string | null>(null);

	const [title, setTitle] = useState('');

	const labelText = error ? error : placeholder;

	const buttonColor = title ? 'primary' : 'inherit';

	const trimmedTitle = title.trim();

	const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value);
		if (error) setError(null);
	};

	const addItemHandler = async () => {
		if (trimmedTitle) {
			try {
				await addItem(title);
				setTitle('');
			} catch (err) {
				setError('Invalid value');
			}
		} else {
			setError('Title is required');
		}
	};

	const onKeyDownAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') addItemHandler();
		if (error) setError(null);
	};

	return (
		<div className="add-item-form">
			<TextField
				id="outlined-basic"
				label={labelText}
				variant="outlined"
				size="small"
				value={title}
				onKeyDown={onKeyDownAdd}
				onChange={onChangeInputHandler}
				error={!!error}
				disabled={disabled}
				sx={{ flexGrow: '1' }}
			/>
			<Button
				variant="contained"
				color={buttonColor}
				onClick={addItemHandler}
				disabled={disabled}
				sx={{ minWidth: '44px', width: '44px' }}
			>
				<AddIcon />
			</Button>
		</div>
	);
});
