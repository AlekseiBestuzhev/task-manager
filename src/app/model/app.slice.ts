import { createSlice, isFulfilled, isPending, isRejected, PayloadAction } from '@reduxjs/toolkit';
import { RejectValueType } from 'shared/utils/create-app-async-thunk';

const initialState = {
	status: 'idle' as RequestStatusType,
	error: null as string | null,
	isInitialized: false,
};

export type AppInitialStateType = typeof initialState;
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

const slice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
			state.error = action.payload.error;
		},
		setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
			state.isInitialized = action.payload.isInitialized;
		},
	},
	extraReducers: (builder) => {
		builder
			.addMatcher(isPending, (state) => {
				state.status = 'loading';
			})
			.addMatcher(isRejected, (state, action) => {
				if (action.payload) {
					const payload = action.payload as RejectValueType;
					if (payload.showGlobalError) {
						state.error = payload.data.messages.length ? payload.data.messages[0] : 'Some error occurred';
					}
				} else {
					state.error = action.error.message ? action.error.message : 'Some error occurred';
				}
				state.status = 'failed';
			})
			.addMatcher(isFulfilled, (state) => {
				state.status = 'succeeded';
			});
	},
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;
