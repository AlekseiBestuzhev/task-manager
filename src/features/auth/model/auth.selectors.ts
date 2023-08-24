import { AppRootStateType } from 'app/providers/store/store';
export const selectIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn;
