import { get_category_by_id, delete_category_by_id } from '@/server/db/queries'
import { validate_id } from '@/utils/validations/validate-id'
import { Hono } from 'hono'
import { ZodError } from 'zod'

export const deleteCategory = new Hono().delete(
  '/categories/:id',
  async ({ json, req }) => {
    try {
      const { id } = validate_id.parse(req.param)
      const existingCategory = await get_category_by_id(`${id}`)
      if (!existingCategory) {
        return json(`Categoria com ID ${id} não encontrada`, 404)
      }
      await delete_category_by_id(id)
      return json({ message: 'Categoria apagada com sucesso' }, 200)
    } catch (error) {
      if (error instanceof ZodError) {
        return json({ error: error.issues.map(({ message }) => message) }, 400)
      }

      console.error('Unhandled error:', error)
      return json({ error: error }, 500)
    }
  }
)
