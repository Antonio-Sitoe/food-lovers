import { db } from '@/server/db/connection'
import { UnauthorizedError } from '../authentication/errors/unauthorized-error'
import { Hono } from 'hono'
import { HonoApp } from '@/@types/Hono-types'

export const getOrderDetails = new Hono<HonoApp>().get(
  '/orders/:id',
  async ({ req, json }) => {
    const { id: orderId } = req.param()

    const order = await db.query.orders.findFirst({
      columns: {
        id: true,
        createdAt: true,
        status: true,
        totalInCents: true,
      },
      with: {
        customer: {
          columns: {
            name: true,
            phone: true,
            email: true,
          },
        },
        orderItems: {
          columns: {
            id: true,
            quantity: true,
            productId: true,
          },
          with: {
            product: {
              columns: {
                name: true,
                description: true,
              },
            },
          },
        },
      },
      where(fields, { eq, and }) {
        return and(eq(fields.id, orderId))
      },
    })

    if (!order) {
      throw new UnauthorizedError()
    }

    return json(order)
  }
)
