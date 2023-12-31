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

export const profileFormSchema = z.object({
    first_name: z
        .string()
        .trim()
        .min(1, { message: 'Please enter your first name' })
        .max(16, { message: 'First name must be under 16 characters' })
        .refine((first_name) => /^[a-zA-Z]/.test(first_name), { message: 'First name can only contain letters (A-Z).' }),
    last_name: z
        .string()
        .trim()
        .min(1, { message: 'Please enter your last name' })
        .max(16, { message: 'Last name must be under 16 characters' })
        .refine((last_name) => /^[a-zA-Z]/.test(last_name), { message: 'Last name can only contain letters (A-Z).' }),
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
    job_title: z
        .string()
        .trim()
        .min(1, { message: 'Please add your job title' })
        .refine((job_title) => /^[A-Za-z /-]+$/.test(job_title), {
            message: 'Job title can only contain letters (A-Z), hyphens (-) or forward slash (/).',
        }),
});

export const updatePasswordFormSchema = z.object({
    password: z.string().trim().min(1, { message: 'Please enter your current password' }),
    newPassword: z.string().trim().min(1, { message: 'Choose a new password' }),
    confirmNewPassword: z.string().trim().min(1, { message: 'Confirm the new password' }),
});

export const createProjectFormSchema = z.object({
    title: z.string().trim().min(1, { message: 'Please enter project title' }),
    description: z.string().trim().min(1, { message: 'Please enter project description' }),
    start_date: z.any().refine((date) => date !== null, { message: 'Please choose a start date' }),
    end_date: z.any().refine((date) => date !== null, { message: 'Please choose a end date' }),
});

export const updateProjectFormSchema = z.object({
    title: z.string().trim().min(1, { message: 'Please enter project title' }),
    description: z.string().trim().min(1, { message: 'Please enter project description' }),
    start_date: z.any().refine((date) => date !== null, { message: 'Please choose a start date' }),
    end_date: z.any().refine((date) => date !== null, { message: 'Please choose a end date' }),
});

export const manageProjectUsersFormSchema = z.object({
    users: z.array(z.number()),
});

export const createTicketFormSchema = z.object({
    project_id: z
        .string()
        .optional()
        .refine((project) => project !== undefined, { message: 'Please select a project' }),
    title: z.string().trim().min(1, { message: 'Please enter ticket title' }),
    description: z.string().trim().min(1, { message: 'Please enter ticket description' }),
    priority: z
        .enum(['low', 'medium', 'high', 'critical'])
        .optional()
        .refine((value) => value !== undefined, { message: 'Please select ticket priority' }),
});

export const commentFormSchema = z.object({
    content: z.string().trim().min(1, { message: 'Please enter comment' }),
});

const StatusEnum = ['unassigned', 'assigned', 'in_development', 'on_hold', 'resolved'] as const;
const PriorityEnum = ['low', 'medium', 'high', 'critical'] as const;

export const updateStatusFormSchema = z.object({
    status: z.enum(StatusEnum).refine((value) => StatusEnum.includes(value), { message: 'Please select ticket status' }),
});

export const updateTicketFormSchema = z.object({
    title: z.string().trim().min(1, { message: 'Please enter ticket title' }),
    description: z.string().trim().min(1, { message: 'Please enter ticket description' }),
    priority: z.enum(PriorityEnum).refine((value) => PriorityEnum.includes(value), { message: 'Please select ticket priority' }),
    status: z.enum(StatusEnum).refine((value) => StatusEnum.includes(value), { message: 'Please select ticket status' }),
    assigned_user_id: z.string().optional(),
    completed_date: z.date().optional(),
});
