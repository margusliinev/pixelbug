import { InferModel } from 'drizzle-orm';
import { boolean, pgEnum, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

const roleEnum = pgEnum('role', ['user', 'admin', 'test']);

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
