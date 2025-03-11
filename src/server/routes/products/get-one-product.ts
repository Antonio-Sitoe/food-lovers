import { get_product_by_id } from '@/server/db/queries'
import { Hono } from 'hono'

export const getOneProduct = new Hono().get(
  '/products/:id',
  async ({ req, json }) => {
    const { id } = req.param()
    const product = await get_product_by_id({ id })
    if (!product) {
      return json('Product not found', 404)
    }
    return json(
      {
        product,
      },
      200
    )
  }
)
