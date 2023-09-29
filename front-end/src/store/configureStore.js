import { configureStore } from '@reduxjs/toolkit'
import { workoutReducer } from '../features/getWorkout/getWorkoutSlide'

const store = configureStore({ 
    reducer: {
        workout: workoutReducer,
    }

})

export default store