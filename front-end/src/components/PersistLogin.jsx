import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Não se esqueça de importar useDispatch
import { toggleLoginModal } from '../features/modalSlice';
import { selectCurrentToken } from "../features/authSlice";
import usePersist from '../hooks/usePersist';

export const PersistLogin = ({ children }) => {
  const dispatch = useDispatch();
  const token = useSelector(selectCurrentToken); 
  const [persist] = usePersist();

  useEffect(() => {

    if (!token && !persist) {
      dispatch(toggleLoginModal());
    }
  }, [token, persist, dispatch]); 


  const isAuthenticated = token !== null;

  return isAuthenticated ? children : null;
};
