import { NextFunction, Response } from 'express';

import { AuthenticatedRequest, BadRequestError, UnauthenticatedError, verifyToken } from '../utils';

export const auth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (!token) {
        throw new UnauthenticatedError('Authentication Invalid');
    }
    try {
        const { user_id, role } = verifyToken(token);
        req.user = { user_id, role };
        next();
    } catch (error) {
        throw new UnauthenticatedError('Authentication Invalid');
    }
};

export const checkForTestUser = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (req.user?.role === 'test') throw new BadRequestError('demo', 'Demo user cannot perform this action');
    next();
};
