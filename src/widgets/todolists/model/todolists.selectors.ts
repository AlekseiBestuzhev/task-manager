import { AppRootStateType } from 'app/providers/store';
import { TodolistDomainType } from './todolists.slice';

export const selectTodolists = (state: AppRootStateType): TodolistDomainType[] => state.todolists;
