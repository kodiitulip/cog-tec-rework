import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const courses = pgTable('courses', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  imageScr: text('image_src').notNull(),
});
