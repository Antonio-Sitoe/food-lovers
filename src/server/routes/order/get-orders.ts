import { db } from '@/server/db/connection'
import { Hono } from 'hono'
import { HonoApp } from '@/@types/Hono-types'
import { orders, users } from '@/server/db/schema'
import { eq, and, ilike, desc, count, sql } from 'drizzle-orm'
import { getOrderSchema } from '@/utils/validations/get-order'

export const getOrders = new Hono<HonoApp>().get(
  '/orders',
  async ({ req, json }) => {
    const { pageIndex, orderId, customerName, status } = getOrderSchema.parse(
      req.query()
    )

    const baseQuery = db
      .select({
        orderId: orders.id,
        createdAt: orders.createdAt,
        status: orders.status,
        customerName: users.name,
        total: orders.totalInCents,
      })
      .from(orders)
      .innerJoin(users, eq(users.id, orders.customerId))
      .where(
        and(
          orderId ? ilike(orders.id, `%${orderId}%`) : undefined,
          status ? eq(orders.status, status) : undefined,
          customerName ? ilike(users.name, `%${customerName}%`) : undefined
        )
      )

    const [ordersCount] = await db
      .select({ count: count() })
      .from(baseQuery.as('baseQuery'))

    const allOrders = await baseQuery
      .offset(pageIndex * 10)
      .limit(10)
      .orderBy((fields) => {
        return [
          sql`CASE ${fields.status} 
            WHEN 'pending' THEN 1
            WHEN 'processing' THEN 2
            WHEN 'delivering' THEN 3
            WHEN 'delivered' THEN 4
            WHEN 'canceled' THEN 99
          END`,
          desc(fields.createdAt),
        ]
      })

    const result = {
      orders: allOrders,
      meta: {
        pageIndex,
        perPage: 10,
        totalCount: ordersCount.count,
      },
    }

    return json(result)
  }
)
