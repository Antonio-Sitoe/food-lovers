import { createId } from '@paralleldrive/cuid2'
import { integer, pgTable, text, timestamp, boolean } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { orderItems } from './order-items'
import { categories } from './category'

export const products = pgTable('products', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text('name').unique().notNull(),
  description: text('description'),
  price: integer('price').notNull(),
  categoryId: text('category_id'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  isDeleted: boolean('is_deleted').default(false).notNull(),
})

export const productsRelations = relations(products, ({ many, one }) => ({
  orderItems: many(orderItems),
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
}))

export type INewProducts = typeof products.$inferInsert
