import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
    AllProjectsAPIResponse,
    CreateProject,
    CreateProjectAPIResponse,
    DefaultAPIResponse,
    Login,
    ProjectAPIResponse,
    ProjectUsersAPIResponse,
    Register,
    UpdateProject,
    UpdateProjectUsers,
    UpdateUserPassword,
    UpdateUserProfile,
    UserAPIResponse,
} from '../../utils/types';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
    tagTypes: ['Projects', 'Project'],
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
        // Projects
        getAllProjects: builder.query<AllProjectsAPIResponse, undefined>({
            query: () => ({
                url: '/projects',
                method: 'GET',
                headers: {
                    'Cache-Control': 'no-cache',
                },
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
                headers: {
                    'Cache-Control': 'no-cache',
                },
            }),
            providesTags: ['Project'],
        }),
        getProjectUsers: builder.query<ProjectUsersAPIResponse, string>({
            query: (project_id) => ({
                url: `/projects/${project_id}/users`,
                method: 'GET',
            }),
            providesTags: ['Project'],
        }),
        updateProjectUsers: builder.mutation<DefaultAPIResponse, UpdateProjectUsers>({
            query: ({ updated_users, project_id }) => ({
                url: `/projects/${project_id}/users`,
                method: 'PUT',
                body: updated_users,
            }),
            invalidatesTags: ['Project'],
        }),
        updateProject: builder.mutation<DefaultAPIResponse, UpdateProject>({
            query: ({ values, project_id }) => ({
                url: `/projects/${project_id}`,
                method: 'PATCH',
                body: values,
            }),
            invalidatesTags: ['Project'],
        }),
        deleteProject: builder.mutation<DefaultAPIResponse, string>({
            query: (project_id) => ({
                url: `/projects/${project_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Projects'],
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useUpdateUserProfileMutation,
    useUpdateUserPasswordMutation,
    useUpdateUserPictureMutation,
    useCreateProjectMutation,
    useGetAllProjectsQuery,
    useGetSingleProjectQuery,
    useGetProjectUsersQuery,
    useUpdateProjectUsersMutation,
    useUpdateProjectMutation,
    useDeleteProjectMutation,
} = apiSlice;
