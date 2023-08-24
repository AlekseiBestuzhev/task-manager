import { AppRootStateType } from 'app/providers/store';

export const selectTasks = (state: AppRootStateType) => state.tasks;
