import { TodolistType, todolistsApi, UpdateTodolistTitleArgType } from 'features/todolists-management/api/todolists.api';
import { tasksThunks } from 'features/tasks-management/model/tasks.slice';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { clearTasksAndTodolists } from 'shared/actions';
import { RequestStatusType } from 'app/model/app.slice';
import { createAppAsyncThunk } from 'shared/utils';
import { ResultCode } from 'shared/enums';

const initialState: TodolistDomainType[] = [];

const slice = createSlice({
	name: 'todo',
	initialState,
	reducers: {
		changeTodolistFilter: (state, action: PayloadAction<{ id: string; filter: FilterValuesType }>) => {
			const todo = state.find((todo) => todo.id === action.payload.id);
			if (todo) {
				todo.filter = action.payload.filter;
			}
		},
		changeTodolistEntityStatus: (state, action: PayloadAction<{ id: string; entityStatus: RequestStatusType }>) => {
			const todo = state.find((todo) => todo.id === action.payload.id);
			if (todo) {
				todo.entityStatus = action.payload.entityStatus;
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTodolists.fulfilled, (state, action) => {
				return action.payload.todolists.map((tl) => ({ ...tl, filter: 'all', entityStatus: 'idle' }));
			})
			.addCase(addTodolist.fulfilled, (state, action) => {
				const newTodolist: TodolistDomainType = {
					...action.payload.todolist,
					filter: 'all',
					entityStatus: 'idle',
				};
				state.unshift(newTodolist);
			})
			.addCase(removeTodolist.fulfilled, (state, action) => {
				const index = state.findIndex((todo) => todo.id === action.payload.id);
				if (index !== -1) state.splice(index, 1);
			})
			.addCase(changeTodolistTitle.fulfilled, (state, action) => {
				const todo = state.find((todo) => todo.id === action.payload.id);
				if (todo) {
					todo.title = action.payload.title;
				}
			})
			.addCase(clearTasksAndTodolists, () => {
				return [];
			});
	},
});

// _____ thunks

const fetchTodolists = createAppAsyncThunk<{ todolists: TodolistType[] }, void>('todo/fetchTodolists', async (_, thunkAPI) => {
	const { dispatch } = thunkAPI;
	const res = await todolistsApi.getTodolists();
	res.data.forEach((list) => dispatch(tasksThunks.fetchTasks(list.id)));
	return { todolists: res.data };
});

const addTodolist = createAppAsyncThunk<{ todolist: TodolistType }, string>('todo/addTodolist', async (title, thunkAPI) => {
	const { rejectWithValue } = thunkAPI;
	const res = await todolistsApi.createTodolist(title);
	if (res.data.resultCode === ResultCode.Success) {
		return { todolist: res.data.data.item };
	} else {
		return rejectWithValue({ data: res.data, showGlobalError: true });
	}
});

const removeTodolist = createAppAsyncThunk<{ id: string }, string>('todo/removeTodolist', async (id, thunkAPI) => {
	const { dispatch, rejectWithValue } = thunkAPI;

	dispatch(todolistsActions.changeTodolistEntityStatus({ id, entityStatus: 'loading' }));
	const res = await todolistsApi.deleteTodolist(id);
	if (res.data.resultCode === ResultCode.Success) {
		return { id };
	} else {
		return rejectWithValue({ data: res.data, showGlobalError: true });
	}
});

const changeTodolistTitle = createAppAsyncThunk<UpdateTodolistTitleArgType, UpdateTodolistTitleArgType>(
	'todo/changeTodolistTitle',
	async (arg, thunkAPI) => {
		const { rejectWithValue } = thunkAPI;
		const res = await todolistsApi.updateTodolist(arg);
		if (res.data.resultCode === ResultCode.Success) {
			return arg;
		} else {
			return rejectWithValue({ data: res.data, showGlobalError: true });
		}
	}
);

export const todolistsReducer = slice.reducer;
export const todolistsActions = slice.actions;
export const todolistsThunks = { fetchTodolists, addTodolist, removeTodolist, changeTodolistTitle };

// types
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
	filter: FilterValuesType;
	entityStatus: RequestStatusType;
};
