import { configureStore } from '@reduxjs/toolkit'
import { workoutReducer } from '../features/getWorkout/getWorkoutSlide'
import { modalReducer } from '../features/modalSlice'

const store = configureStore({ 
    reducer: {
        workout: workoutReducer,
        modal: modalReducer
    }

})

export default store