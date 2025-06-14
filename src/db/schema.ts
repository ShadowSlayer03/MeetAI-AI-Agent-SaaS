import { pgTable, varchar, integer, serial } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  age: integer('age'),
  email: varchar('email', { length: 255 }).notNull().unique(),
});