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

export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    job_title: string;
    profile_picture: string;
    verified: boolean;
    role: 'user' | 'admin' | 'test';
    created_t: Date;
    updated_At: Date;
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
