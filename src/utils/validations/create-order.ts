import { z } from 'zod'

export const create_orders_schema = z.object({
  products: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number(),
    }),
    {
      required_error: 'The product list is required',
      invalid_type_error: 'Products must be an array of objects',
    }
  ),
})
