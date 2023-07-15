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
