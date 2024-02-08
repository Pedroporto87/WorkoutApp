import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../features/apiSlice"

const seriesAdapter = createEntityAdapter({})

const initialState = seriesAdapter.getInitialState()

export const seriesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getSeries: builder.query({
            query: () => '/series',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedSeries = responseData.map(user => {
                    user.id = user._id
                    return user
                });
                return seriesAdapter.setAll(initialState, loadedSeries)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Series', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Series', id }))
                    ]
                } else return [{ type: 'Series', id: 'LIST' }]
            }
        }),
    }),
})

export const {
    useGetSeriesQuery,
} = seriesApiSlice

// returns the query result object
export const selectSeriesResult = seriesApiSlice.endpoints.getSeries.select()

// creates memoized selector
const selectSeriesData = createSelector(
    selectSeriesResult,
    seriesResult => seriesResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllseries,
    selectById: selectSeriesById,
    selectIds: selectSerisIds
    // Pass in a selector that returns the series slice of state
} = seriesAdapter.getSelectors(state => selectSeriesData(state) ?? initialState)