import { createAppAsyncThunk, handleServerNetworkError } from 'shared/utils';
import { authAPI, LoginParamsType } from 'features/auth/api/auth.api';
import { clearTasksAndTodolists } from 'shared/actions';
import { appActions } from 'app/model/app.slice';
import { createSlice } from '@reduxjs/toolkit';
import { ResultCode } from 'shared/enums';

const slice = createSlice({
	name: 'auth',
	initialState: {
		isLoggedIn: false,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(login.fulfilled, (state, action) => {
				state.isLoggedIn = action.payload.isLoggedIn;
			})
			.addCase(logout.fulfilled, (state, action) => {
				state.isLoggedIn = action.payload.isLoggedIn;
			})
			.addCase(initializeApp.fulfilled, (state, action) => {
				state.isLoggedIn = action.payload.isLoggedIn;
			});
	},
});

// _____ thunks

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>('auth/login', async (arg, thunkAPI) => {
	const { rejectWithValue } = thunkAPI;
	const res = await authAPI.login(arg);
	if (res.data.resultCode === ResultCode.Success) {
		return { isLoggedIn: true };
	} else {
		const isShowAppError = !res.data.fieldsErrors.length;
		return rejectWithValue({ data: res.data, showGlobalError: isShowAppError });
	}
});

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, void>('auth/logout', async (_, thunkAPI) => {
	const { dispatch, rejectWithValue } = thunkAPI;
	const res = await authAPI.logout();
	if (res.data.resultCode === ResultCode.Success) {
		dispatch(clearTasksAndTodolists());
		return { isLoggedIn: false };
	} else {
		return rejectWithValue({ data: res.data, showGlobalError: true });
	}
});

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, void>('app/initializeApp', async (_, thunkAPI) => {
	const { dispatch, rejectWithValue } = thunkAPI;
	try {
		const res = await authAPI.me();
		if (res.data.resultCode === ResultCode.Success) {
			return { isLoggedIn: true };
		} else {
			return rejectWithValue(null);
		}
	} catch (e) {
		handleServerNetworkError(e, dispatch);
		return rejectWithValue(null);
	} finally {
		dispatch(appActions.setAppInitialized({ isInitialized: true }));
	}
});

export const authThunks = { login, logout, initializeApp };

export const authSlice = slice.reducer;
