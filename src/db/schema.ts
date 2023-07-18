import { InferModel } from 'drizzle-orm';
import { boolean, integer, pgEnum, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

const roleEnum = pgEnum('role', ['user', 'admin', 'test']);
const priorityEnum = pgEnum('priority', ['low', 'medium', 'high']);
const statusEnum = pgEnum('status', ['assigned', 'development', 'resolved']);

export const users = pgTable('users', {
    user_id: serial('user_id').primaryKey(),
    username: varchar('username', { length: 16 }).notNull(),
    email: varchar('email', { length: 50 }).notNull(),
    password: varchar('password', { length: 256 }).notNull(),
    first_name: varchar('first_name', { length: 16 }),
    last_name: varchar('last_name', { length: 16 }),
    job_title: varchar('job_title', { length: 50 }),
    profile_picture: varchar('profile_picture', { length: 256 }),
    verified: boolean('verified').default(false).notNull(),
    role: roleEnum('role').default('user').notNull(),
    created_at: timestamp('created_at').notNull(),
    updated_at: timestamp('updated_at').notNull(),
});

export type Role = 'user' | 'admin' | 'test';
export type User = InferModel<typeof users, 'select'>;
export type NewUser = InferModel<typeof users, 'insert'>;

export const projects = pgTable('projects', {
    project_id: serial('project_id').primaryKey(),
    title: varchar('title', { length: 50 }).notNull(),
    description: text('description').notNull(),
    manager_id: integer('manager_id')
        .notNull()
        .references(() => users.user_id),
    start_date: timestamp('start_date').notNull(),
    end_date: timestamp('end_date').notNull(),
    completed_date: timestamp('completed_date'),
});

export type Project = InferModel<typeof projects, 'select'>;
export type NewProject = InferModel<typeof projects, 'insert'>;

export const tickets = pgTable('tickets', {
    ticket_id: serial('ticket_id').primaryKey(),
    project_id: integer('project_id').references(() => projects.project_id),
    title: varchar('title', { length: 50 }).notNull(),
    description: text('description').notNull(),
    assigned_user_id: integer('assigned_user_id').references(() => users.user_id),
    priority: priorityEnum('priority').default('low').notNull(),
    status: statusEnum('status').default('assigned').notNull(),
    start_date: timestamp('start_date').notNull(),
    end_date: timestamp('end_date').notNull(),
    completed_date: timestamp('completed_date'),
});

export const projects_users = pgTable('projects_users', {
    project_user_id: serial('project_user_id').primaryKey(),
    project_id: integer('project_id').references(() => projects.project_id),
    user_id: integer('user_id').references(() => users.user_id),
});
