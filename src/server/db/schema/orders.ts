import { createId } from '@paralleldrive/cuid2'
import { integer, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { users } from '.'
import { orderItems } from './order-items'

export const orderStatusEnum = pgEnum('order_status', [
  'pending',
  'canceled',
  'processing',
  'delivering',
  'delivered',
])

export const orders = pgTable('orders', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),
  customerId: text('customer_id')
    .references(() => users.id, {
      onDelete: 'set null',
    })
    .notNull(),

  status: orderStatusEnum('status').default('pending').notNull(),
  totalInCents: integer('total_in_cents').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

export const ordersRelations = relations(orders, ({ one, many }) => ({
  customer: one(users, {
    fields: [orders.customerId],
    references: [users.id],
  }),
  orderItems: many(orderItems),
}))
