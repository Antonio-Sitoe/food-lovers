import { count, eq } from 'drizzle-orm'
import { db } from '@/server/db/connection'
import { orderItems, orders, products } from '@/server/db/schema'
import { HonoApp } from '@/@types/Hono-types'
import { Hono } from 'hono'

export const getPopularProducts = new Hono<HonoApp>().get(
  '/metrics/popular-products',
  async ({ json }) => {
    try {
      const popularProducts = await db
        .select({
          product: products.name,
          amount: count(orderItems.id),
        })
        .from(orderItems)
        .leftJoin(orders, eq(orders.id, orderItems.orderId))
        .leftJoin(products, eq(products.id, orderItems.productId))
        .groupBy(products.name)
        .limit(5)

      return json(popularProducts)
    } catch (err) {
      console.log(err)
    }
  }
)
