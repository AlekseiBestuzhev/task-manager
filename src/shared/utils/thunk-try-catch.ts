import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { AppDispatch, AppRootStateType } from 'app/providers/store';
import { handleServerNetworkError } from 'shared/utils';
import { BaseResponseType } from 'shared/types';

export const thunkTryCatch = async <T>(
	thunkAPI: BaseThunkAPI<AppRootStateType, unknown, AppDispatch, null | BaseResponseType>,
	logic: () => Promise<T>
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
	const { dispatch, rejectWithValue } = thunkAPI;
	try {
		return await logic();
	} catch (e) {
		handleServerNetworkError(e, dispatch);
		return rejectWithValue(null);
	} finally {
	}
};
