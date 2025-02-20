import { int, text, sqliteTable } from 'drizzle-orm/sqlite-core'

export const siloTable = sqliteTable('silo', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  volume: int().notNull(),
  crop: text().notNull(),
  stored: int().notNull(),
  customer: text().notNull(),
})
