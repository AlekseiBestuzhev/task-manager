import { TodolistDomainType, todolistsThunks, todolistsReducer } from 'features/todolists-management/model/todolists.slice';
import { TasksStateType, tasksReducer } from 'features/tasks-management/model/tasks.slice';
import { TodolistType } from 'features/todolists-management/api/todolists.api';

test('ids should be equals', () => {
	const startTasksState: TasksStateType = {};
	const startTodolistsState: Array<TodolistDomainType> = [];

	let todolist: TodolistType = {
		title: 'new todolist',
		id: 'any id',
		addedDate: '',
		order: 0,
	};

	const action = todolistsThunks.addTodolist.fulfilled({ todolist: todolist }, 'requestId', todolist.title);

	const endTasksState = tasksReducer(startTasksState, action);
	const endTodolistsState = todolistsReducer(startTodolistsState, action);

	const keys = Object.keys(endTasksState);
	const idFromTasks = keys[0];
	const idFromTodolists = endTodolistsState[0].id;

	expect(idFromTasks).toBe(action.payload.todolist.id);
	expect(idFromTodolists).toBe(action.payload.todolist.id);
});
