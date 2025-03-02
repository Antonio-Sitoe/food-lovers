import { save_category, search_category_by_name } from '@/server/db/queries'
import { category_schema } from '@/utils/validations/create-category'
import { Hono } from 'hono'
import { ZodError } from 'zod'

export const createCategory = new Hono().post(
  '/categories',
  async ({ req: request, json }) => {
    try {
      const category = await request.json()
      const { name, description } = category_schema.parse(category)

      const hasCategory = await search_category_by_name(name)

      if (hasCategory) {
        return json(`Já existe uma categoria com o nome ${name}`, 409)
      }
      const new_category = await save_category({
        name,
        description,
      })
      return json(
        { message: 'Categoria criada com sucesso', data: new_category },
        200
      )
    } catch (error) {
      if (error instanceof ZodError) {
        return json({ error: error.issues.map(({ message }) => message) }, 400)
      }
      console.error('Unhandled error:', error)
      return json({ error: error }, 500)
    }
  }
)
