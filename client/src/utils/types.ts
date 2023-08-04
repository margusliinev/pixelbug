// AUTHENTICATION TYPES

export interface Register {
    username: string;
    email: string;
    password: string;
}

export interface Login {
    email: string;
    password: string;
}

// USER TYPES

export interface User {
    user_id: number;
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    job_title: string;
    profile_picture: string;
    verified: boolean;
    role: 'user' | 'admin' | 'test';
    created_at: Date;
    updated_at: Date;
}

export interface UpdateUserProfile {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    job_title: string;
}

export interface UpdateUserPassword {
    password: string;
    newPassword: string;
    confirmNewPassword: string;
}

export interface UserAPIResponse {
    success: boolean;
    isAuth: boolean;
    user: User;
    msg: string;
}

// TICKET TYPES

export interface Ticket {
    ticket_id: number;
    project_id: number;
    title: string;
    description: string;
    assigned_user_id: number;
    reported_user_id: number;
    priority: PriorityEnum;
    status: StatusEnum;
    start_date: Date;
    end_date: Date;
    completed_date: Date;
    project_manager_id?: number;
    project_title?: string;
    assigned_user?: string;
    reporter_user?: string;
}

export interface CreateTicket {
    project_id: number | undefined;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high' | 'critical' | undefined;
}

export interface UpdateTicket {
    values: {
        title: string;
        description: string;
        assigned_user_id?: string | undefined;
        priority: 'low' | 'medium' | 'high' | 'critical';
        status: 'unassigned' | 'assigned' | 'in_development' | 'on_hold' | 'resolved';
        completed_date?: Date | null;
    };
    ticket_id: string;
}

export interface DeleteTicket {
    ticket_id: number;
}

export interface AllTicketsAPIResponse {
    success: boolean;
    tickets: Ticket[];
}

export interface TicketAPIResponse {
    success: boolean;
    ticket: Ticket;
    msg: string;
}

// PROJECT TYPES

export interface Project {
    project_id: number;
    title: string;
    description: string;
    manager_id: number;
    start_date: Date;
    end_date: Date;
    completed_date: Date;
    manager: User;
    users: User[];
    tickets: Ticket[];
}

export interface CreateProject {
    title: string;
    description: string;
    start_date: Date;
    end_date: Date;
}

export interface UpdateProject {
    values: {
        title: string;
        description: string;
        start_date?: Date;
        end_date?: Date;
    };
    project_id: string;
}

export interface UpdateProjectUsers {
    updated_users: number[];
    project_id: string;
}

export interface DeleteProject {
    project_id: number;
}

export interface AllProjectsAPIResponse {
    success: boolean;
    projects: Project[];
}

export interface ProjectAPIResponse {
    success: boolean;
    project: Project;
}

export interface ProjectUsersAPIResponse {
    success: boolean;
    projectUsers: User[];
    otherUsers: User[];
    manager_id: number;
}

// ENUMS

export enum PriorityEnum {
    low = 'low',
    medium = 'medium',
    high = 'high',
    critical = 'critical',
}

export enum StatusEnum {
    unassigned = 'unassigned',
    assigned = 'assigned',
    in_development = 'in_development',
    on_hold = 'on_hold',
    resolved = 'resolved',
}

// DEFAULT RESPONSE TYPES

export interface DefaultAPIResponse {
    success: boolean;
    msg: string;
}

export interface DefaultAPIError {
    data: {
        success: boolean;
        msg: string;
        type?: string;
    };
    status: number;
}
