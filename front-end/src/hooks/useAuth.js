import { useSelector } from 'react-redux';

export const useAuth = () => {
  const accessToken = useSelector(state => state.auth.accessToken); // Ajuste o caminho conforme seu estado global
  return !!accessToken; // Retorna true se accessToken existir, false caso contrário
};
