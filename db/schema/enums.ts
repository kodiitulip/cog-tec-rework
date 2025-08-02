import { boolean, integer, pgEnum, pgPolicy, pgTable, serial, text, uuid } from 'drizzle-orm/pg-core';

export const appRolesEnum = pgEnum('app_roles', ['ADMIN', 'USER']);
export const challengesEnum = pgEnum('type', ['SELECT', 'ASSIST']);
