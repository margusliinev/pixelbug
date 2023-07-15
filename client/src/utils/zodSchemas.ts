import z from 'zod';

export const registerFormSchema = z.object({
    username: z
        .string()
        .trim()
        .refine((username) => username.length >= 3 && username.length <= 16, {
            message: 'Username must be between 3 and 16 characters',
        })
        .refine((username) => !username.startsWith('-') && !username.endsWith('-'), {
            message: 'Username cannot start or end with a hyphen',
        })
        .refine((username) => /^[a-zA-Z0-9-]+$/.test(username), {
            message: 'Username can only contain letters A-Z, numbers, and hyphens (-)',
        }),
    email: z
        .string()
        .trim()
        .max(50, { message: 'Email must be under 50 characters' })
        .email({ message: 'Invalid Email' })
        .refine((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), {
            message: 'Invalid Email',
        }),
    password: z
        .string()
        .trim()
        .min(8, { message: 'Password must be at least 8 characters' })
        .max(50, { message: 'Password must be under 50 characters' })
        .refine((password) => /[A-Za-z]/.test(password), {
            message: 'Password must contain at least one letter',
        })
        .refine((password) => /\d/.test(password), {
            message: 'Password must contain at least one number',
        })
        .refine((password) => /^[A-Za-z\d!@#$%&*,.?]+$/.test(password), {
            message: 'Allowed special characters: !@#$%&*,.?',
        }),
});

export const loginFormSchema = z.object({
    email: z.string().trim(),
    password: z.string().trim(),
});
