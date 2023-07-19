import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { DefaultAPIResponse, ProjectUsersAPIResponse, UpdateUserPassword, UpdateUserProfile, UserAPIResponse } from '../../utils/types';

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
        logout: builder.mutation<DefaultAPIResponse, undefined>({
            query: () => ({
                url: '/logout',
                method: 'POST',
            }),
        }),
        // User
        updateUserPicture: builder.mutation<UserAPIResponse, FormData>({
            query: (profile) => ({
                url: '/users/me/picture',
                method: 'PATCH',
                body: profile,
                formData: true,
            }),
        }),
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
        deleteUser: builder.mutation({
            query: () => ({
                url: '/users/me',
                method: 'DELETE',
            }),
        }),
        // Project Users
        getProjectUsers: builder.query<ProjectUsersAPIResponse, undefined>({
            query: () => ({
                url: '/users',
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useUpdateUserProfileMutation,
    useUpdateUserPasswordMutation,
    useDeleteUserMutation,
    useUpdateUserPictureMutation,
    useGetProjectUsersQuery,
} = apiSlice;
