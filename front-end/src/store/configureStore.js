import { configureStore } from '@reduxjs/toolkit'
import { workoutReducer } from '../features/getWorkout/getWorkoutSlide'
import { modalReducer } from '../features/modalSlice'
import { authReducer } from '../features/authSlice'
import { apiSlice } from '../features/apiSlice'
import { setupListeners } from "@reduxjs/toolkit/query"

const store = configureStore({ 
    reducer: {
        workout: workoutReducer,
        modal: modalReducer,
        auth: authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})
setupListeners(store.dispatch)
export default store