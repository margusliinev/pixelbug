import { Request, Response } from 'express';

export const logout = (req: Request, res: Response) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
    });
    res.setHeader('cache-control', 'no-store').status(200).json({ success: true, msg: 'Logout successful' });
};
