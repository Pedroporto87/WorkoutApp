import { configureStore } from '@reduxjs/toolkit'
import { workoutReducer } from '../features/getWorkout/getWorkoutSlide'
import { postWorkoutReducer } from '../features/getWorkout/postWorkout/postWorkoutSlice'

const store = configureStore({ 
    reducer: {
        workout: workoutReducer,
    }

})

export default store