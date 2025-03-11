import { db } from '@/server/db/connection'
import { orders } from '@/server/db/schema'
import { orderItems } from '@/server/db/schema/order-items'
import { Hono } from 'hono'
import { HonoApp } from '@/@types/Hono-types'
import { ZodError } from 'zod'
import { create_orders_schema } from '@/utils/validations/create-order'

export const CreateOrders = new Hono<HonoApp>().post(
  '/orders',
  async ({ json, get, req }) => {
    try {
      const currentUser = await get('getCurrentUser')()

      if (!currentUser || !currentUser.id) {
        throw new Error('User not authenticated')
      }
      const customerId = currentUser.id
      const { products } = create_orders_schema.parse(await req.json())

      const productIds = products.map((item) => item.productId)

      const productsList = await db.query.products.findMany({
        where: (fields, { inArray }) => inArray(fields.id, productIds),
      })
      let totalInCents = 0
      const orderProducts = products.map((item) => {
        const productItem = productsList.find(
          (product) => product.id === item.productId
        )
        if (!productItem) {
          throw new Error('Produto não encontrado.')
        }
        const price = item.quantity * productItem.price
        totalInCents += price

        return {
          productId: item.productId,
          unitPriceInCents: productItem.price,
          quantity: item.quantity,
          subtotalInCents: item.quantity * productItem.price,
        }
      })

      await db.transaction(async (tx) => {
        const [order] = await tx
          .insert(orders)
          .values({
            totalInCents,
            customerId,
            createdAt: new Date(),
            status: 'pending',
          })
          .returning({
            id: orders.id,
          })

        await tx.insert(orderItems).values(
          orderProducts.map((orderProduct) => {
            return {
              orderId: order.id,
              productId: orderProduct.productId,
              priceInCents: orderProduct.unitPriceInCents,
              quantity: orderProduct.quantity,
            }
          })
        )
      })

      return json({ message: 'Pedido criado!' })
    } catch (error) {
      if (error instanceof ZodError) {
        return json({ error: error }, 400)
      }

      return json({ error: (error as Error)?.message || error }, 500)
    }
  }
)
