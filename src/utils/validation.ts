import { and, eq, not } from 'drizzle-orm';

import { db } from '../db/index';
import { users } from '../db/schema';
import { BadRequestError } from '.';

const usernameRegex = /^[a-zA-Z\d](?:[a-zA-Z\d]|-(?=[a-zA-Z\d])){3,16}$/;
const emailRegex = /^[^\s@]{1,50}@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%&*,.?]{8,50}$/;
const nameRegex = /^[a-zA-Z]{0,16}$/;
const jobTitleRegex = /^[A-Za-z /-]+$/;

export const validateUsername = (username: string): void => {
    if (!usernameRegex.test(username)) {
        if (!usernameRegex.test(username)) {
            if (username.length < 3 || username.length > 16) {
                throw new BadRequestError('username', 'Username must be between 3 and 16 characters.');
            } else if (username.startsWith('-')) {
                throw new BadRequestError('username', 'Username cannot start with a hyphen.');
            } else if (username.endsWith('-')) {
                throw new BadRequestError('username', 'Username cannot end with a hyphen.');
            } else {
                throw new BadRequestError('username', 'Username can only contain letters (A-Z), numbers (0-9), and hyphens (-).');
            }
        }
    }
};

export const validateEmail = (email: string): void => {
    if (!emailRegex.test(email)) {
        throw new BadRequestError('email', 'Email is invalid');
    }
};

export const validatePassword = (password: string): void => {
    if (!passwordRegex.test(password)) {
        if (password.length < 8) {
            throw new BadRequestError('password', 'Password must be at least 8 characters long');
        } else if (password.length > 50) {
            throw new BadRequestError('password', 'Password must be less than 50 characters long');
        } else if (!/(?=.*[a-z])/.test(password)) {
            throw new BadRequestError('password', 'Password must contain at least one letter');
        } else if (!/(?=.*\d)/.test(password)) {
            throw new BadRequestError('password', 'Password must contain at least one number');
        } else {
            throw new BadRequestError('password', 'Allowed special characters in password: !@#$%&*,.?');
        }
    }
};

export const validateName = (name: string): void => {
    if (!nameRegex.test(name)) {
        if (name.length > 16) {
            throw new BadRequestError('name', 'Name must be under 16 characters long.');
        } else {
            throw new BadRequestError('name', 'Name can only contain letters (A-Z).');
        }
    }
};

export const validateJobTitle = (jobTitle: string): void => {
    if (!jobTitleRegex.test(jobTitle)) {
        throw new BadRequestError('job_title', 'Job title can only contain letters (A-Z), hyphens (-) or forward slash (/).');
    }
};

export const normalizeEmail = (email: string): string => {
    const normalizedEmail = email.toLowerCase().trim();
    return normalizedEmail;
};

export const isEmailUnique = async (email: string): Promise<boolean> => {
    const result = await db.select({ email: users.email }).from(users).where(eq(users.email, email));
    if (result.length >= 1) {
        return false;
    } else {
        return true;
    }
};

export const isUpdatedEmailUnique = async (email: string, userId: number): Promise<boolean> => {
    const result = await db
        .select({ email: users.email })
        .from(users)
        .where(and(eq(users.email, email), not(eq(users.id, userId))));
    if (result.length >= 1) {
        return false;
    } else {
        return true;
    }
};
