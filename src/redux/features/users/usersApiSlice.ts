import { apiSlice } from '../api/apiSlice';

const USERS_URL = `${import.meta.env.VITE_API_ENDPOINT}/v1`;

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder: any) => ({
        login: builder.mutation({
            query: (data: any) => ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: data
            })
        })
    }),
})

export const { useLoginMutation } = usersApiSlice;