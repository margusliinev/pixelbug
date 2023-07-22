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
            providesTags: ['Project'],
        }),
        getProjectUsers: builder.query<ProjectUsersAPIResponse, string>({
            query: (project_id) => ({
                url: `/projects/${project_id}/users`,
                method: 'GET',
            }),
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
    useUpdateProjectUsersMutation,
    useUpdateProjectMutation,
} = apiSlice;
