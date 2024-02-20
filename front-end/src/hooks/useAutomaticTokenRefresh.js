import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { useRefreshMutation } from '../../features/authApiSlide';
import { selectCurrentToken, setCredentials } from '../../features/authSlice';

export const useAutomaticTokenRefresh = () => {
    const dispatch = useDispatch();
    const token = useSelector(selectCurrentToken);
    const [refresh] = useRefreshMutation();

    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000; // Convertido para segundos

            // Verifica se o token expirará em menos de 5 minutos
            if (decodedToken.exp < currentTime + 300) {
                refresh().unwrap().then((data) => {
                    dispatch(setCredentials({ accessToken: data.accessToken }));
                }).catch((error) => {
                    console.error('Error refreshing token:', error);
                    // Aqui você pode adicionar uma lógica para deslogar o usuário ou tratar o erro
                });
            }
        }
    }, [token, dispatch, refresh]);
};