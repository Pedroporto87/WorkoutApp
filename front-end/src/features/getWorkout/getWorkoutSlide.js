import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const fetchApiData = createAsyncThunk('getWorkout', async (serieId) => {
  const response = await axios.get(`http://localhost:4000/api/workouts/${serieId}/get-all`)
  return response.data;
});

  
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
        },
        deleteWorkoutSucess(state, action) {
          state.data = state.data.filter((workout) => workout.id !== action.payload)
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
            state.loading = false; // Define o estado de carregamento como falso, indicando que a solicitação foi concluída com sucesso.
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



  export const postWorkout = createAsyncThunk('postWorkout', async(data, serieId) => {
        const response = await axios.post(`http://localhost:4000/workouts/${serieId}/createworkout`, data)
        return response.data
})

export const updateWorkout = createAsyncThunk('editWorkout', async({ id, data }) => {
 
  const response = await axios.patch(`http://localhost:4000/workouts/${id}`, data)
  return response.data
})

export const deleteWorkout = createAsyncThunk('deleteWorkout', async(id) => {
   
      await axios.delete(`http://localhost:4000/workouts/${id}`);
      return id;
    
  }
);

export const { getWorkoutLoading, getWorkoutSucess, getWorkoutError, postWorkoutSucess, deleteWorkoutSucess } = getWorkoutSlice.actions;
export const { reducer: workoutReducer} = getWorkoutSlice


