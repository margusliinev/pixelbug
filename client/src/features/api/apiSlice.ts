import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
    AllProjectsAPIResponse,
    CreateProject,
    CreateProjectAPIResponse,
    DefaultAPIResponse,
    ProjectAPIResponse,
    ProjectUsersAPIResponse,
    UpdateUserPassword,
    UpdateUserProfile,
    UserAPIResponse,
} from '../../utils/types';

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
    tagTypes: ['Projects'],
    endpoints: (builder) => ({
        // Auth
        register: builder.mutation<DefaultAPIResponse, Register>({
            query: (newUser) => ({
                url: '/auth/register',
                method: 'POST',
                body: newUser,
            }),
        }),
        login: builder.mutation<DefaultAPIResponse, Login>({
            query: (user) => ({
                url: '/auth/login',
                method: 'POST',
                body: user,
            }),
        }),
        logout: builder.mutation<DefaultAPIResponse, undefined>({
            query: () => ({
                url: '/auth/logout',
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
        // Projects
        getAllProjects: builder.query<AllProjectsAPIResponse, undefined>({
            query: () => ({
                url: '/projects',
                method: 'GET',
            }),
            providesTags: ['Projects'],
        }),
        createProject: builder.mutation<CreateProjectAPIResponse, CreateProject>({
            query: (projectData) => ({
                url: '/projects',
                method: 'POST',
                body: projectData,
            }),
            invalidatesTags: ['Projects'],
        }),
        getSingleProject: builder.query<ProjectAPIResponse, string>({
            query: (project_id) => ({
                url: `/projects/${project_id}`,
                method: 'GET',
            }),
        }),
        getProjectUsers: builder.query<ProjectUsersAPIResponse, string>({
            query: (project_id) => ({
                url: `/projects/${project_id}/users`,
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
    useCreateProjectMutation,
    useGetAllProjectsQuery,
    useGetSingleProjectQuery,
    useGetProjectUsersQuery,
} = apiSlice;
