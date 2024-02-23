import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const workoutsAdapter = createEntityAdapter({
  // Esta comparação é apenas um exemplo. Ajuste conforme necessário.
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = workoutsAdapter.getInitialState();

export const workoutApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getWorkoutsBySerie: builder.query({
      query: (serieId) => `/workouts/${serieId}/get-all`,
      transformResponse: responseData => {
        // Verifica se a propriedade 'workouts' existe e é um array antes de tentar mapeá-la
        if (responseData.workouts && Array.isArray(responseData.workouts)) {
          const loadedWorkouts = responseData.workouts.map(workout => {
            return { ...workout, id: workout._id }; // Ajuste de "_id" para "id"
          });
          return loadedWorkouts; // Retorna o array de workouts transformado
        } else {
          console.error('Formato de resposta inesperado:', responseData);
          return []; // Retorna um array vazio se a resposta não for o que esperávamos
        }
      },
      providesTags: (result, error, serieId) => [{ type: 'Workout', id: `LIST_${serieId}` }],
    }),
    getWorkout: builder.query({
      query: (id) => `/workouts/${id}`,
      // Este endpoint retorna apenas um único workout, então não é necessário usar o adapter aqui.
      providesTags: (result, error, id) => [{ type: 'Workout', id }],
    }),
    addNewWorkout: builder.mutation({
      query: ({ serieId, ...newWorkout }) => ({
        url: `/workouts/${serieId}/createworkout`,
        method: 'POST',
        body: newWorkout,
      }),
      invalidatesTags: [{ type: 'Workout', id: "LIST" }],
    }),
    deleteWorkout: builder.mutation({
      query: (id) => ({
        url: `/workouts/${id}`,
        method: 'DELETE',
        body: { id }
      }),
      invalidatesTags: [{ type: 'Workout', id: "LIST" }],
    }),
    updateWorkout: builder.mutation({
      query: ({ id, ...updatedWorkout }) => ({
        url: `/workouts/${id}`,
        method: 'PATCH',
        body: updatedWorkout,
      }),
      invalidatesTags: [{ type: 'Workout', id: "LIST" }],
    }),
    updateWorkoutOrder: builder.mutation({
      query: ({serieId, orderedWorkouts}) => ({
        url: `/workouts/${serieId}/update-order`,
        method: 'PATCH',
        body: { orderedWorkouts: orderedWorkouts.map((id, index) => ({id, newOrder: index})) },
      }),
      invalidatesTags: (result, error, { serieId }) => [{ type: 'Workout', id: `LIST_${serieId}` }],
    })
  }),
});

export const {
  useGetWorkoutsBySerieQuery,
  useGetWorkoutQuery,
  useAddNewWorkoutMutation,
  useDeleteWorkoutMutation,
  useUpdateWorkoutMutation,
  useUpdateWorkoutOrderMutation,
} = workoutApiSlice;

// Para selecionar os dados dos treinos de forma similar ao que fizemos para as séries:
export const selectWorkoutsResult = workoutApiSlice.endpoints.getWorkoutsBySerie.select();

const selectWorkoutsData = createSelector(
  selectWorkoutsResult,
  workoutsResult => workoutsResult.data // Objeto de estado normalizado com ids e entidades
);

export const {
  selectAll: selectAllWorkouts,
  selectById: selectWorkoutById,
  selectIds: selectWorkoutIds,
} = workoutsAdapter.getSelectors(state => selectWorkoutsData(state) ?? initialState);