import { todolistsThunks } from 'features/todolists-management/model/todolists.slice';
import { tasksApi } from 'features/tasks-management/api/tasks.api';
import { clearTasksAndTodolists } from 'shared/actions';
import { createAppAsyncThunk } from 'shared/utils';
import { appActions } from 'app/model/app.slice';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ResultCode } from 'shared/enums';
import {
	UpdateTaskModelType,
	RemoveTaskArgType,
	UpdateTaskArgType,
	TaskResponseType,
	AddTaskArgType,
	TaskType,
} from 'features/tasks-management/api/tasks.api.types';

const initialState: TasksStateType = {};

const slice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		setLoading: (state, action: PayloadAction<{ id: string; listId: string; loading: boolean }>) => {
			const task = state[action.payload.listId].find((task) => task.id === action.payload.id);
			if (task) {
				task.loading = action.payload.loading;
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTasks.fulfilled, (state, action) => {
				state[action.payload.todolistId] = action.payload.tasks.map((task) => ({ ...task, loading: false }));
			})
			.addCase(addTask.fulfilled, (state, action) => {
				const tasks = state[action.payload.task.todoListId];
				tasks.unshift({ ...action.payload.task, loading: false });
			})
			.addCase(updateTask.fulfilled, (state, action) => {
				const tasks = state[action.payload.todolistId];
				const index = tasks.findIndex((t) => t.id === action.payload.taskId);
				if (index !== -1) {
					tasks[index] = { ...tasks[index], ...action.payload.domainModel };
				}
			})
			.addCase(removeTask.fulfilled, (state, action) => {
				const tasks = state[action.payload.todolistId];
				const index = tasks.findIndex((t) => t.id === action.payload.taskId);
				if (index !== -1) tasks.splice(index, 1);
			})
			.addCase(todolistsThunks.addTodolist.fulfilled, (state, action) => {
				state[action.payload.todolist.id] = [];
			})
			.addCase(todolistsThunks.removeTodolist.fulfilled, (state, action) => {
				delete state[action.payload.id];
			})
			.addCase(todolistsThunks.fetchTodolists.fulfilled, (state, action) => {
				action.payload.todolists.forEach((tl) => {
					state[tl.id] = [];
				});
			})
			.addCase(clearTasksAndTodolists, () => {
				return {};
			});
	},
});

// _____ thunks

const fetchTasks = createAppAsyncThunk<{ tasks: TaskResponseType[]; todolistId: string }, string>(
	'tasks/fetchTasks',
	async (todolistId) => {
		const res = await tasksApi.getTasks(todolistId);
		const tasks = res.data.items;
		return { tasks, todolistId };
	}
);

const addTask = createAppAsyncThunk<{ task: TaskResponseType }, AddTaskArgType>('tasks/addTask', async (arg, thunkAPI) => {
	const { rejectWithValue } = thunkAPI;
	const res = await tasksApi.createTask(arg);
	if (res.data.resultCode === ResultCode.Success) {
		const task = res.data.data.item;
		return { task };
	} else {
		return rejectWithValue({ data: res.data, showGlobalError: true });
	}
});

const updateTask = createAppAsyncThunk<UpdateTaskArgType, UpdateTaskArgType>('tasks/updateTask', async (arg, thunkAPI) => {
	const { dispatch, rejectWithValue, getState } = thunkAPI;

	const state = getState();
	const task = state.tasks[arg.todolistId].find((t) => t.id === arg.taskId);
	if (!task) {
		dispatch(appActions.setAppError({ error: 'Task not found in the state' }));
		return rejectWithValue(null);
	}

	dispatch(tasksActions.setLoading({ listId: arg.todolistId, id: arg.taskId, loading: true }));
	const apiModel: UpdateTaskModelType = {
		deadline: task.deadline,
		description: task.description,
		priority: task.priority,
		startDate: task.startDate,
		title: task.title,
		status: task.status,
		...arg.domainModel,
	};
	const res = await tasksApi.updateTask(arg.todolistId, arg.taskId, apiModel);
	dispatch(tasksActions.setLoading({ listId: arg.todolistId, id: arg.taskId, loading: false }));
	if (res.data.resultCode === ResultCode.Success) {
		return arg;
	} else {
		return rejectWithValue({ data: res.data, showGlobalError: true });
	}
});

const removeTask = createAppAsyncThunk<RemoveTaskArgType, RemoveTaskArgType>('tasks/removeTask', async (arg, thunkAPI) => {
	const { rejectWithValue, dispatch } = thunkAPI;
	dispatch(tasksActions.setLoading({ listId: arg.todolistId, id: arg.taskId, loading: true }));
	const res = await tasksApi.deleteTask(arg);
	if (res.data.resultCode === ResultCode.Success) {
		return arg;
	} else {
		return rejectWithValue({ data: res.data, showGlobalError: true });
	}
});

export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;
export const tasksThunks = { fetchTasks, addTask, updateTask, removeTask };

export type TasksStateType = Record<string, TaskType[]>;
