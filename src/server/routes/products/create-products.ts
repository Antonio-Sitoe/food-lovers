import { get_category_by_id, save_products } from '@/server/db/queries'
import { productsSchema } from '@/utils/validations/products'
import { ZodError } from 'zod'
import { CategoryNotExistError } from '../../errors/categoryNotExist'
import { PostgresError } from '@/@types/postgress'
import { Hono } from 'hono'

export const createProducts = new Hono().post(
  '/products',
  async ({ json, req }) => {
    try {
      const data = await req.json()

      const { categoryId, name, price, description } =
        productsSchema.parse(data)

      const hasCategoryExist = await get_category_by_id(categoryId)
      if (!hasCategoryExist) throw new CategoryNotExistError()

      const product = await save_products({
        name: name?.trim(),
        price,
        description,
        categoryId,
      })

      return json(
        { message: 'Producto criado com sucesso', data: product },
        200
      )
    } catch (error) {
      if (error instanceof ZodError) {
        return json({ error: error }, 400)
      }

      if ((error as PostgresError)?.code === '23505') {
        return json({ error: 'Ja existe um produto com esse nome' }, 400)
      }

      return json({ error: (error as Error)?.message || error }, 500)
    }
  }
)
