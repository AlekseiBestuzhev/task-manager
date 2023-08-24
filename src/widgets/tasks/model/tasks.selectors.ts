import { AppRootStateType } from 'app/providers/store/store';

export const selectTasks = (state: AppRootStateType) => state.tasks;
