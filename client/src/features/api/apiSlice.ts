import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { DefaultAPIResponse } from '../../utils/types';

interface Register {
    username: string;
    email: string;
    password: string;
}

interface Login {
    email: string;
    password: string;
}

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
    endpoints: (builder) => ({
        register: builder.mutation<DefaultAPIResponse, Register>({
            query: (newUser) => ({
                url: '/register',
                method: 'POST',
                body: newUser,
            }),
        }),
        login: builder.mutation<DefaultAPIResponse, Login>({
            query: (user) => ({
                url: '/login',
                method: 'POST',
                body: user,
            }),
        }),
        logout: builder.mutation<DefaultAPIResponse, null>({
            query: () => ({
                url: '/logout',
                method: 'POST',
            }),
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } = apiSlice;
