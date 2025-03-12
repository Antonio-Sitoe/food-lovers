import { db } from '@/server/db/connection'
import { orders } from '@/server/db/schema'
import { eq } from 'drizzle-orm'
import { UnauthorizedError } from '../authentication/errors/unauthorized-error'
import { Hono } from 'hono'
import { HonoApp } from '@/@types/Hono-types'

export const dispatchOrder = new Hono<HonoApp>().patch(
  '/orders/:id/dispatch',
  async ({ req, json }) => {
    const { id: orderId } = req.param()

    const order = await db.query.orders.findFirst({
      where(fields, { eq, and }) {
        return and(eq(fields.id, orderId))
      },
    })

    if (!order) {
      throw new UnauthorizedError()
    }

    if (order.status !== 'processing') {
      return json({ message: 'O pedido já foi enviado ao cliente.' }, 400)
    }

    await db
      .update(orders)
      .set({
        status: 'delivering',
      })
      .where(eq(orders.id, orderId))
    return json({ message: 'Success' })
  }
)
