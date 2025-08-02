import { pgEnum } from 'drizzle-orm/pg-core';

export const appRolesEnum = pgEnum('app_roles', ['ADMIN']);
export const challengesEnum = pgEnum('type', ['SELECT', 'ASSIST']);
