import {
  get_category_by_id,
  get_product_by_id,
  update_product_on_db,
} from '@/server/db/queries'
import { productsSchema } from '@/utils/validations/products'
import { validate_id } from '@/utils/validations/validate-id'
import { Hono } from 'hono'
import { ZodError } from 'zod'

export const updateProduct = new Hono().patch(
  '/products/:id',
  async ({ req, json }) => {
    try {
      const { id } = validate_id.parse(req.param)
      const product = await req.json()
      const { name, description, categoryId, price } =
        productsSchema.parse(product)

      const existingCategory = await get_category_by_id(categoryId)
      if (!existingCategory) {
        return json(`Categoria com ID ${id} não encontrada`, 404)
      }

      const productExist = await get_product_by_id({ id })

      if (!productExist) {
        return json(`Produto com ID ${id} não encontrada`, 404)
      }

      const updatedProduct = await update_product_on_db(id, {
        name,
        description,
        categoryId,
        price,
      })

      return json(
        { message: 'Produto atualizado com sucesso', data: updatedProduct },
        200
      )
    } catch (error) {
      if (error instanceof ZodError) {
        return json({ error: error.issues.map(({ message }) => message) }, 400)
      }
      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code === '23505'
      ) {
        return json({ error: 'Já existe um Produto com esse nome.' }, 409)
      }
      console.error('Unhandled error:', error)
      return json({ error: error }, 500)
    }
  }
)
