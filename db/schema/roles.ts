import { pgPolicy, pgTable, serial, uuid } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { authenticatedRole, authUsers } from 'drizzle-orm/supabase';
import { appRolesEnum } from '@/db/schema/enums';

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
    pgPolicy('Admin access to user_roles', {
      as: 'permissive',
      for: 'all',
      to: authenticatedRole,
      using: sql`true`,
    }),
  ]
);
