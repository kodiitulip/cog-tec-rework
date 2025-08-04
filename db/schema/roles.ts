import { pgPolicy, pgTable, serial, uuid } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { authUsers, supabaseAuthAdminRole, authenticatedRole } from 'drizzle-orm/supabase';
import { appRolesEnum, appPermissionsEnum } from '@/db/schema/enums';

export const rolePermissions = pgTable(
  'role_permissions',
  {
    id: serial('id').primaryKey(),
    role: appRolesEnum().notNull(),
    permission: appPermissionsEnum().notNull(),
  },
  () => [
    pgPolicy('Allow auth admin to read roles permission', {
      as: 'permissive',
      for: 'all',
      to: supabaseAuthAdminRole,
      using: sql``,
    }),
  ]
);

export const userRoles = pgTable(
  'user_roles',
  {
    id: serial('id').primaryKey(),
    userId: uuid('user_id')
      .references(() => authUsers.id, { onDelete: 'cascade' })
      .unique()
      .notNull(),
    role: appRolesEnum().notNull(),
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (_self) => [
    pgPolicy('Admin read access to user roles', {
      for: 'select',
      as: 'permissive',
      to: authenticatedRole,
      using: sql``,
    }),
    pgPolicy('Admin delete access to user roles', {
      for: 'delete',
      to: authenticatedRole,
      using: sql`select public.authorize('COURSES.DELETE')`,
      // withCheck: sql`select public.authorize('COURSES.DELETE')`,
    }),
    pgPolicy('Admin insert access to user roles', {
      for: 'insert',
      to: authenticatedRole,
      withCheck: sql`select public.authorize('COURSES.INSERT')`,
    }),
    pgPolicy('Admin update access to user roles', {
      for: 'update',
      to: authenticatedRole,
      using: sql`select public.authorize('COURSES.INSERT')`,
    }),
  ]
);
