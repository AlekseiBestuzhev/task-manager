import { AppDispatch, AppRootStateType } from 'app/providers/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BaseResponseType } from 'shared/types';

/**
Эта функция предназначена для того, чтобы избавиться от дублирования кода по созданию типов в санке
 */

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
	state: AppRootStateType;
	dispatch: AppDispatch;
	rejectValue: null | RejectValueType;
}>();

export type RejectValueType = {
	data: BaseResponseType;
	showGlobalError: boolean;
};