import { comparePassword, hashPassword } from './bcrypt';
import { createCookie } from './cookie';
import { dateToUTC } from './dates';
import { BadRequestError, NotFoundError, UnauthenticatedError, UnauthorizedError } from './errors';
import { limiter } from './limiter';
import { createToken, verifyToken } from './token';
import { AuthenticatedRequest } from './types';
import {
    isEmailUnique,
    isUpdatedEmailUnique,
    normalizeEmail,
    validateEmail,
    validateFirstName,
    validateJobTitle,
    validateLastName,
    validatePassword,
    validateUsername,
} from './validation';

export {
    AuthenticatedRequest,
    BadRequestError,
    comparePassword,
    createCookie,
    createToken,
    dateToUTC,
    hashPassword,
    isEmailUnique,
    isUpdatedEmailUnique,
    limiter,
    normalizeEmail,
    NotFoundError,
    UnauthenticatedError,
    UnauthorizedError,
    validateEmail,
    validateFirstName,
    validateJobTitle,
    validateLastName,
    validatePassword,
    validateUsername,
    verifyToken,
};
