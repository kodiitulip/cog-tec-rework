import { pgEnum } from 'drizzle-orm/pg-core';

export const appPermissionsEnum = pgEnum('app_permission', ['COURSES.INSERT','COURSES.DELETE','LIBRARY.INSERT','LIBRARY.DELETE'])
export const appRolesEnum = pgEnum('app_roles', ['ADMIN']);
export const challengesEnum = pgEnum('type', ['SELECT', 'ASSIST']);
