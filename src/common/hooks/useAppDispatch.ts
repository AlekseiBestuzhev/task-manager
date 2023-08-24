import { useDispatch } from 'react-redux';
import { AppDispatch } from 'app/providers/store/store';

export const useAppDispatch: () => AppDispatch = useDispatch;
