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
            state.accessTokenExpiry = Date.now() + expiresIn * 7 * 24 * 60 * 60 * 1000; // Supondo que expiresIn esteja em segundos
        },
    }
})

export const { setCredentials, logOut } = authSlice.actions

export const { reducer: authReducer } = authSlice

export const selectCurrentToken = (state) => state.auth.accessToken
export const selectRefreshToken = (state) => state.auth.refreshToken
export const selectAccessTokenExpiry = (state) => state.auth.accessTokenExpiry