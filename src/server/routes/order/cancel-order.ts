import { HonoApp } from '@/@types/Hono-types'
import { db } from '@/server/db/connection'
import { orders } from '@/server/db/schema'
import { eq } from 'drizzle-orm'
import { Hono } from 'hono'

export const cancelOrder = new Hono<HonoApp>().patch(
  '/orders/:id/cancel',
  async ({ req, json }) => {
    const { id: orderId } = req.param()

    const order = await db.query.orders.findFirst({
      where(fields, { eq, and }) {
        return and(eq(fields.id, orderId))
      },
    })

    if (!order) {
      return json('Order not found under the user managed restaurant.', 401)
    }

    if (!['pending', 'processing'].includes(order.status)) {
      return json(
        {
          code: 'STATUS_NOT_VALID',
          message: 'O pedido não pode ser cancelado depois de ser enviado.',
        },
        400
      )
    }

    await db
      .update(orders)
      .set({
        status: 'canceled',
      })
      .where(eq(orders.id, orderId))

    return json('Order cancelled')
  }
)
