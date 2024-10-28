import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pizzaApi = createApi({ 
    reducerPath: 'pizzaApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9009/api'}),
    endpoints: (build) => ({
        getOrderHistory: build.query({
            query: () => '/pizza/history',
            providesTags: ['Orders'],
        }),
        createOrder: build.mutation({
            query: (newOrder) => ({
                url: '/pizza/order',
                method: 'POST',
                body: newOrder
            }),
            invalidatesTags: ['Orders'], 
        }),
    }),
})

export const { useGetOrderHistoryQuery, useCreateOrderMutation} = pizzaApi