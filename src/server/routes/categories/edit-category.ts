import { update_category_on_db, get_category_by_id } from '@/server/db/queries'
import { category_schema } from '@/utils/validations/create-category'
import { validate_id } from '@/utils/validations/validate-id'
import { Hono } from 'hono'
import { ZodError } from 'zod'

export const updateCategory = new Hono().patch(
  '/categories/:id',
  async ({ req, json }) => {
    try {
      const { id } = validate_id.parse(req.param)
      const categoryUpdate = await req.json()
      const { name, description } = category_schema.parse(categoryUpdate)

      // Verifica se a categoria existe pelo ID
      const existingCategory = await get_category_by_id(`${id}`)
      if (!existingCategory) {
        return json(`Categoria com ID ${id} não encontrada`, 404)
      }

      const updatedCategory = await update_category_on_db(id, {
        name,
        description,
      })

      return json(
        { message: 'Categoria atualizada com sucesso', data: updatedCategory },
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
        return json({ error: 'Já existe uma categoria com esse nome.' }, 409)
      }
      console.error('Unhandled error:', error)
      return json({ error: error }, 500)
    }
  }
)
