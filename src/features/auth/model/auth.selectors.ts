import { AppRootStateType } from 'app/providers/store';

export const selectIsLoggedIn = (state: AppRootStateType): boolean => state.auth.isLoggedIn;
