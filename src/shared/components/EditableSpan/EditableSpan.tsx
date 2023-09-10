import React, { CSSProperties, ChangeEvent, FC, memo, useState } from 'react';
import { TextField } from '@mui/material';

type EditableSpanPropsType = {
	value: string;
	onChange: (newValue: string) => void;
};

export const EditableSpan: FC<EditableSpanPropsType> = memo(({ value, onChange }) => {
	let [editMode, setEditMode] = useState(false);
	let [title, setTitle] = useState(value);

	const activateEditMode = () => {
		setEditMode(true);
		setTitle(value);
	};

	const activateViewMode = () => {
		if (title !== value) {
			onChange(title);
		}
		setEditMode(false);
	};

	const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value);
	};

	const style: CSSProperties = {
		minWidth: '170px',
		width: '170px',
	};

	return editMode ? (
		<TextField value={title} size="small" onChange={changeTitle} autoFocus onBlur={activateViewMode} sx={style} />
	) : (
		<span className="editable-span" onClick={activateEditMode}>
			{value}
		</span>
	);
});
