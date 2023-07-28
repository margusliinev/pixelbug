/* eslint-disable @typescript-eslint/no-unused-vars */
import { and, eq, ne } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';
import { Response } from 'express';

import { db } from '../../db';
import { projects, projects_users, tickets, User, users } from '../../db/schema';
import { AuthenticatedRequest, NotFoundError, UnauthenticatedError, UnauthorizedError } from '../../utils';

export const getProject = async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) throw new UnauthenticatedError('Authentication Invalid');

    const { project_id } = req.params;

    const assigned_users = alias(users, 'assigned_user');
    const reporter_users = alias(users, 'reporter_user');

    const projectQuery = await db
        .select()
        .from(projects)
        .leftJoin(tickets, eq(projects.project_id, tickets.project_id))
        .leftJoin(assigned_users, eq(assigned_users.user_id, tickets.assigned_user_id))
        .leftJoin(reporter_users, eq(reporter_users.user_id, tickets.reporter_user_id))
        .where(eq(projects.project_id, Number(project_id)));
    const projectData = projectQuery[0].projects;

    if (projectQuery.length < 1) {
        throw new NotFoundError('Project not found');
    }

    const projectManagerId = projectQuery[0].projects.manager_id;
    const manager = await db.select().from(users).where(eq(users.user_id, projectManagerId));
    const { password, ...managerNoPassword } = manager[0]; // Exclude password from manager data

    const projectUsersQuery = await db
        .selectDistinct({ users: users })
        .from(projects)
        .leftJoin(projects_users, eq(projects.project_id, projects_users.project_id))
        .leftJoin(users, eq(projects_users.user_id, users.user_id))
        .where(and(eq(projects.project_id, Number(project_id)), ne(projects_users.user_id, projectManagerId)));
    const projectUsers = projectUsersQuery.map((user) => {
        const { password, ...userNoPassword } = user.users as User; // Exclude password from user data
        return userNoPassword;
    });

    const isUserProjectMember = projectUsers.map((user) => user?.user_id).includes(req.user.user_id);
    const isUserManager = req.user.user_id === projectManagerId;

    if (!isUserManager && !isUserProjectMember) {
        throw new UnauthorizedError('You are not authorized to view this project');
    }

    const projectTickets = projectQuery.map((project) => {
        if (!project.tickets) {
            return null;
        }
        const assignee = project.assigned_user as User;
        const reporter = project.reporter_user as User;
        return {
            ...project.tickets,
            assigned_user: assignee
                ? assignee.first_name && assignee.last_name
                    ? `${assignee.first_name} ${assignee.last_name}`
                    : assignee.username
                : 'Unassigned',
            reporter_user: reporter.first_name && reporter.last_name ? `${reporter.first_name} ${reporter.last_name}` : reporter.username,
        };
    });

    if (projectTickets[0] === null) {
        const project = { ...projectData, tickets: [], manager: managerNoPassword, users: projectUsers };

        res.status(200).json({ success: true, project: project });
    } else {
        const project = { ...projectData, tickets: projectTickets, manager: managerNoPassword, users: projectUsers };

        res.status(200).json({ success: true, project: project });
    }
};
