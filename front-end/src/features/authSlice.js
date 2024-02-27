// authSlice
import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: { accessToken: null, refreshToken: null, accessTokenExpiry: null },
    reducers: {
        logOut: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.accessTokenExpiry = null;
        },
        setCredentials: (state, action) => {
            const { accessToken, refreshToken, expiresIn } = action.payload;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            // Certifique-se de que expiresIn seja convertido corretamente para milissegundos.
            state.accessTokenExpiry = Date.now() + expiresIn * 1000; // Corrigido para considerar expiresIn em segundos
        },
    }
})

export const { setCredentials, logOut } = authSlice.actions

export const { reducer: authReducer } = authSlice

export const selectCurrentToken = (state) => state.auth.accessToken
export const selectRefreshToken = (state) => state.auth.refreshToken
export const selectAccessTokenExpiry = (state) => state.auth.accessTokenExpiry

export const selectIsAuthenticated = (state) => {
    const accessToken = state.auth.accessToken;
    const accessTokenExpiry = state.auth.accessTokenExpiry;
    const now = Date.now();
    // O usuário está autenticado se um accessToken existe e o tempo atual é menor que o tempo de expiração.
    return accessToken !== null && now < accessTokenExpiry;
};