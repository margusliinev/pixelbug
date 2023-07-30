import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
    AllProjectsAPIResponse,
    AllTicketsAPIResponse,
    CreateProject,
    CreateTicket,
    DefaultAPIResponse,
    DeleteProject,
    DeleteTicket,
    Login,
    ProjectAPIResponse,
    ProjectUsersAPIResponse,
    Register,
    TicketAPIResponse,
    UpdateProject,
    UpdateProjectUsers,
    UpdateTicket,
    UpdateUserPassword,
    UpdateUserProfile,
    UserAPIResponse,
} from '../../utils/types';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
    tagTypes: ['Projects', 'Project', 'Tickets', 'Ticket'],
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
        updateUserPassword: builder.mutation<DefaultAPIResponse, UpdateUserPassword>({
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
                cache: 'no-cache',
                headers: {
                    'Cache-Control': 'no-cache',
                },
            }),
            keepUnusedDataFor: 0,
            providesTags: ['Projects'],
        }),
        getSingleProject: builder.query<ProjectAPIResponse, string>({
            query: (project_id) => ({
                url: `/projects/${project_id}`,
                method: 'GET',
                cache: 'no-cache',
                headers: {
                    'Cache-Control': 'no-cache',
                },
            }),
            keepUnusedDataFor: 0,
            providesTags: ['Project', 'Ticket'],
        }),
        getProjectUsers: builder.query<ProjectUsersAPIResponse, string>({
            query: (project_id) => ({
                url: `/projects/${project_id}/users`,
                method: 'GET',
            }),
            providesTags: ['Project'],
        }),
        createProject: builder.mutation<DefaultAPIResponse, CreateProject>({
            query: (projectData) => ({
                url: '/projects',
                method: 'POST',
                body: projectData,
            }),
            invalidatesTags: ['Projects'],
        }),
        updateProject: builder.mutation<DefaultAPIResponse, UpdateProject>({
            query: ({ values, project_id }) => ({
                url: `/projects/${project_id}`,
                method: 'PATCH',
                body: values,
            }),
            invalidatesTags: ['Project'],
        }),
        updateProjectUsers: builder.mutation<DefaultAPIResponse, UpdateProjectUsers>({
            query: ({ updated_users, project_id }) => ({
                url: `/projects/${project_id}/users`,
                method: 'PUT',
                body: updated_users,
            }),
            invalidatesTags: ['Project'],
        }),
        leaveProject: builder.mutation<DefaultAPIResponse, string>({
            query: (project_id) => ({
                url: `/projects/${project_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Projects'],
        }),
        deleteProject: builder.mutation<DefaultAPIResponse, DeleteProject>({
            query: (project_id) => ({
                url: `/projects`,
                method: 'DELETE',
                body: project_id,
            }),
            invalidatesTags: ['Projects'],
        }),
        // Tickets
        getAllTickets: builder.query<AllTicketsAPIResponse, undefined>({
            query: () => ({
                url: '/tickets',
                method: 'GET',
            }),
        }),
        getTicket: builder.query<TicketAPIResponse, string>({
            query: (ticket_id) => ({
                url: `/tickets/${ticket_id}`,
                method: 'GET',
            }),
            providesTags: ['Ticket'],
        }),
        createTicket: builder.mutation<DefaultAPIResponse, CreateTicket>({
            query: (ticketData) => ({
                url: '/tickets',
                method: 'POST',
                body: ticketData,
            }),
            invalidatesTags: ['Ticket'],
        }),
        updateTicket: builder.mutation<DefaultAPIResponse, UpdateTicket>({
            query: ({ values, ticket_id }) => ({
                url: `/tickets/${ticket_id}`,
                method: 'PATCH',
                body: values,
            }),
            invalidatesTags: ['Ticket'],
        }),
        deleteTicket: builder.mutation<DefaultAPIResponse, DeleteTicket>({
            query: (ticket_id) => ({
                url: `/tickets`,
                method: 'DELETE',
                body: ticket_id,
            }),
            invalidatesTags: ['Project'],
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
    useLeaveProjectMutation,
    useCreateTicketMutation,
    useGetAllTicketsQuery,
    useGetTicketQuery,
    useUpdateTicketMutation,
    useDeleteTicketMutation,
} = apiSlice;
