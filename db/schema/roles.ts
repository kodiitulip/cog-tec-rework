import { pgPolicy, pgTable, serial, uuid } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { authUsers, supabaseAuthAdminRole } from 'drizzle-orm/supabase';
import { appRolesEnum, appPermissionEnum } from '@/db/schema/enums';

export const rolePermissions = pgTable(
  'role_permissions',
  {
    id: serial('id').primaryKey(),
    role: appRolesEnum().notNull(),
    permission: appPermissionEnum().notNull(),
  },
  () => [
    pgPolicy('Allow auth admin to read roles permission', {
      as: 'permissive',
      for: 'all',
      to: supabaseAuthAdminRole,
      using: sql`true`,
    }),
  ]

)

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
  () => [
    pgPolicy('Allow auth admin to read user roles', {
      as: 'permissive',
      for: 'all',
      to: supabaseAuthAdminRole,
      using: sql`true`,
    }),
  ]
);
