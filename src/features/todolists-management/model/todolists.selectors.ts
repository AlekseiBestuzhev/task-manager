import { TodolistDomainType } from 'features/todolists-management/model/todolists.slice';
import { AppRootStateType } from 'app/providers/store';

export const selectTodolists = (state: AppRootStateType): TodolistDomainType[] => state.todolists;

export const selectTodolistRemoving = (id: string) => (state: AppRootStateType) =>
	state.todolists.find((list) => list.id === id)!.entityStatus === 'loading';
