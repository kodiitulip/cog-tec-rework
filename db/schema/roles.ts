import { integer, pgPolicy, pgTable, uuid } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { authUsers, authenticatedRole } from 'drizzle-orm/supabase';
import { appRolesEnum } from '@/db/schema/enums';

export const userRoles = pgTable(
  'user_roles',
  {
    id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
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
      using: sql`authorize public.authorize('COURSES.DELETE')`,
      // withCheck: sql`authorize public.authorize('COURSES.DELETE')`,
    }),
    pgPolicy('Admin insert access to user roles', {
      for: 'insert',
      to: authenticatedRole,
      withCheck: sql`authorize public.authorize('COURSES.INSERT')`,
    }),
    pgPolicy('Admin update access to user roles', {
      for: 'update',
      to: authenticatedRole,
      using: sql`authorize public.authorize('COURSES.INSERT')`,
    }),
  ]
);
