import { Request } from 'express';

import { Role } from '../db/schema';

export interface AuthenticatedRequest extends Request {
    user?: {
        user_id: number;
        role: Role;
    };
    cookies: {
        token: string;
    };
}
