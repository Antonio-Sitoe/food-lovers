import { get_category_by_id } from '@/server/db/queries'
import { validate_id } from '@/utils/validations/validate-id'
import { Hono } from 'hono'

export const getOneCategory = new Hono().get(
  '/categories/:id',
  async ({ req, json }) => {
    const { id } = validate_id.parse(req.param)
    const category = await get_category_by_id(id)
    if (!category) {
      return json('Category not found', 404)
    }
    return json(
      {
        category,
      },
      200
    )
  }
)
