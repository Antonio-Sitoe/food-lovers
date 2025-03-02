import { createId } from '@paralleldrive/cuid2'
import { pgTable, text, timestamp, boolean } from 'drizzle-orm/pg-core' // Added boolean import
import { relations } from 'drizzle-orm'
import { products } from './products'

export const categories = pgTable('categories', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text('name').unique().notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  isDeleted: boolean('is_deleted').default(false).notNull(),
})

export const categoriesRelations = relations(categories, ({ many }) => ({
  categories: many(products),
}))

export type INewCategory = typeof categories.$inferInsert
