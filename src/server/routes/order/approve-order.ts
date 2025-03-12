import { db } from '@/server/db/connection'
import { orders } from '@/server/db/schema'
import { eq } from 'drizzle-orm'
import { UnauthorizedError } from '../authentication/errors/unauthorized-error'
import { Hono } from 'hono'

export const approveOrder = new Hono().patch(
  '/orders/:id/approve',
  async ({ json, req }) => {
    const { id: orderId } = req.param()

    const order = await db.query.orders.findFirst({
      where(fields, { eq, and }) {
        return and(eq(fields.id, orderId))
      },
    })

    if (!order) {
      throw new UnauthorizedError()
    }

    if (order.status !== 'pending') {
      return json({ message: 'Order was already approved before.' }, 400)
    }

    await db
      .update(orders)
      .set({
        status: 'processing',
      })
      .where(eq(orders.id, orderId))

    return json('Order Approved')
  }
)
