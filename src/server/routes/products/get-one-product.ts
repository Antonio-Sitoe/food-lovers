import { get_product_by_id } from '@/server/db/queries'
import { validate_id } from '@/utils/validations/validate-id'
import { Hono } from 'hono'

export const getOneProduct = new Hono().get(
  '/products/:id',
  async ({ req, json }) => {
    const { id } = validate_id.parse(req.param)
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
