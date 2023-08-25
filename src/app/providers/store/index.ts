import { todolistsReducer } from 'features/todolists-management/model/todolists.slice';
import { tasksReducer } from 'features/tasks-management/model/tasks.slice';
import { authSlice } from 'features/auth/model/auth.slice';
import { configureStore } from '@reduxjs/toolkit';
import { appReducer } from 'app/model/app.slice';

export const store = configureStore({
	reducer: {
		tasks: tasksReducer,
		todolists: todolistsReducer,
		app: appReducer,
		auth: authSlice,
	},
});

export type AppRootStateType = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// @ts-ignore
window.store = store;
