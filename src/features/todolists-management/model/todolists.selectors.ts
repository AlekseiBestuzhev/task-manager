import { TodolistDomainType } from 'features/todolists-management/model/todolists.slice';
import { AppRootStateType } from 'app/providers/store';

export const selectTodolists = (state: AppRootStateType): TodolistDomainType[] => state.todolists;
