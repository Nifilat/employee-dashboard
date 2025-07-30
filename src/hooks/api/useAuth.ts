import { useContext } from 'react';
import { AuthContext } from '@/constants/context';

export const useAuth = () => useContext(AuthContext);
