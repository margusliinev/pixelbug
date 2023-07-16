import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { DefaultAPIResponse, UpdateUserPassword, UpdateUserProfile, UserAPIResponse } from '../../utils/types';

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
        // Auth
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
        // User
        updateUserProfile: builder.mutation<UserAPIResponse, UpdateUserProfile>({
            query: (profile) => ({
                url: '/users/me',
                method: 'PATCH',
                body: profile,
            }),
        }),
        updateUserPassword: builder.mutation<UserAPIResponse, UpdateUserPassword>({
            query: (passwords) => ({
                url: '/users/me',
                method: 'PUT',
                body: passwords,
            }),
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation, useUpdateUserProfileMutation, useUpdateUserPasswordMutation } = apiSlice;
