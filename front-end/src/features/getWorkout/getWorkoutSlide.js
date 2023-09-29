import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getWorkoutSlice = createSlice({
    name: 'workout',
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers:{
        getWorkoutLoading(state){
            state.loading = true;
        },
        getWorkoutSucess(state, action){
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        },
        getWorkoutError(state, action) {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
        },
        postWorkoutSucess(state, action) {
          state.loading = false;
          state.data = action.payload;
          state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchApiData.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchApiData.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
          })
          .addCase(fetchApiData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          })
          .addCase(updateWorkout.fulfilled, (state, action) => {
            state.loading = false;
            state.data = state.data.map((workout) =>
              workout.id === action.payload.id ? action.payload : workout
            );
          })
          .addCase(deleteWorkout.fulfilled, (state, action) => {
            // Remova o treino com o 'id' excluído do estado.
            state.data = state.data.filter((workout) => workout.id !== action.payload);
          });
      }
      },
    
)

export const fetchApiData = createAsyncThunk('getWorkout', async () => {
      const response = await axios.get(`http://localhost:4000/api/workouts`);
      return response.data;
  });

  export const postWorkout = createAsyncThunk('postWorkout', async(data) => {
        const response = await axios.post('http://localhost:4000/api/workouts/', data)
        return response.data
})

export const updateWorkout = createAsyncThunk('editWorkout', async(data) => {
  try{
  const response = await axios.patch(`http://localhost:4000/api/workouts/${id}`, data)
  return response.data
  }catch (error) {
    throw error;
  }
})

export const deleteWorkout = createAsyncThunk('workouts/deleteWorkout', async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/workouts/${id}`);
      return id;
    } catch (error) {
      throw error;
    }
  }
);

export const { getWorkoutLoading, getWorkoutSucess, getWorkoutError, postWorkoutSucess } = getWorkoutSlice.actions;
export const { reducer: workoutReducer} = getWorkoutSlice


