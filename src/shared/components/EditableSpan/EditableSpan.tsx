import React, { CSSProperties, ChangeEvent, FC, memo, useState } from 'react';
import { TextField } from '@mui/material';
import { clsx } from 'clsx';

type EditableSpanPropsType = {
	value: string;
	onChange: (newValue: string) => Promise<any>;
	disabled?: boolean;
};

export const EditableSpan: FC<EditableSpanPropsType> = memo(({ value, onChange, disabled }) => {
	const [editMode, setEditMode] = useState(false);

	const [error, setError] = useState(false);

	const [title, setTitle] = useState(value);

	const activateEditMode = () => {
		if (!disabled) {
			setEditMode(true);
			setTitle(value);
		}
	};

	const activateViewMode = async () => {
		if (title !== value) {
			try {
				await onChange(title);
				setEditMode(false);
			} catch {
				setError(true);
			}
		} else {
			setEditMode(false);
		}
	};

	const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value);
	};

	const style: CSSProperties = {
		minWidth: '170px',
		width: '170px',
	};

	const spanClasses = clsx('editable-span', disabled && 'editable-span-disabled');

	return editMode ? (
		<TextField value={title} size="small" onChange={changeTitle} autoFocus onBlur={activateViewMode} sx={style} error={error} />
	) : (
		<span className={spanClasses} onClick={activateEditMode}>
			{value}
		</span>
	);
});
