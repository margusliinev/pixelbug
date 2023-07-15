export class BadRequestError extends Error {
    status: number;
    type: string;
    constructor(key: string, message: string) {
        super(message);
        this.name = 'BadRequestError';
        this.status = 400;
        this.type = key;
    }
}
export class UnauthenticatedError extends Error {
    status: number;
    constructor(message: string) {
        super(message);
        this.name = 'UnauthenticatedError';
        this.status = 401;
    }
}
export class UnauthorizedError extends Error {
    status: number;
    constructor(message: string) {
        super(message);
        this.name = 'UnauthorizedError';
        this.status = 403;
    }
}
export class NotFoundError extends Error {
    status: number;
    constructor(message: string) {
        super(message);
        this.name = 'NotFoundError';
        this.status = 404;
    }
}
