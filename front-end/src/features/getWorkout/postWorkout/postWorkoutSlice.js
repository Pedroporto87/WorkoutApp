import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const postWorkout = createAsyncThunk('postWorkout', async(thunkAPI, data) => {
    try {
        const response = await axios.post('http://localhost:4000/api/workouts/', data)
        return response.data
      } catch (err) {
        return thunkAPI.rejectWithValue({ error: err.message })
      }
})

const postWorkoutSlice = createSlice({
    name: 'workout',
    initialState: {
        data: [{
            title:'',
            carga:'',
            series:'',
            reps:'',
            descanso:''
        }],
        loading: false,
        error: null,
      },
      reducers:{},
      extraReducers: (builder) => {
        builder.addCase(postWorkout.fulfilled, (state, action) => {
            state.loading = false;
            state.data.push(action.payload)
        });
      }
})

export const { postWorkoutLoading, postWorkoutSucess, postWorkoutError } = postWorkoutSlice.actions
export const { reducer: postWorkoutReducer} = postWorkoutSlice