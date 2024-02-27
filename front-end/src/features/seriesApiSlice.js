import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const seriesAdapter = createEntityAdapter({
  sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1,
});

const initialState = seriesAdapter.getInitialState();

export const seriesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getSeries: builder.query({
      query: () => '/series',
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: responseData => {
        const loadedSeries = responseData.map(serie => {
          return { ...serie, id: serie._id }; 
        });
        return seriesAdapter.setAll(initialState, loadedSeries);
      },
      providesTags: (result) => [
        { type: 'Serie', id: 'LIST' },
        ...(result?.ids ? result.ids.map(id => ({ type: 'Serie', id })) : []),
      ],
    }),
    addNewSerie: builder.mutation({
      query: initialSerie => ({
        url: '/series',
        method: 'POST',
        body: initialSerie,
      }),
      invalidatesTags: [{ type: 'Serie', id: "LIST" }],
    }),
    updateSerie: builder.mutation({
      query: serie => ({
        url: `/series/${serie.id}`, // Assume que você passará o id para a URL
        method: 'PATCH',
        body: serie,
      }),
      invalidatesTags: [{ type: 'Serie', id: "LIST" }],
    }),
    deleteSerie: builder.mutation({
      query: ({ id }) => ({
        url: `/series/${id}`, // Correção para usar o id na URL
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Serie', id: "LIST" }],
    }),
  }),
});

export const {
  useGetSeriesQuery,
  useAddNewSerieMutation,
  useUpdateSerieMutation,
  useDeleteSerieMutation,
} = seriesApiSlice;

// returns the query result object
export const selectSeriesResult = seriesApiSlice.endpoints.getSeries.select();

// creates memoized selector
const selectSeriesData = createSelector(
  selectSeriesResult,
  seriesResult => seriesResult.data // normalized state object with ids & entities
);

// GetSelectors creates these selectors, and we rename them with aliases using destructuring
export const {
  selectAll: selectAllSeries,
  selectById: selectSeriesById,
  selectIds: selectSerieIds,
} = seriesAdapter.getSelectors(state => selectSeriesData(state) ?? initialState);
