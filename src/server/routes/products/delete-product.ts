import { HonoApp } from '@/@types/Hono-types'
import { delete_product_by_id, get_product_by_id } from '@/server/db/queries'
import { validate_id } from '@/utils/validations/validate-id'
import { Hono } from 'hono'
import { ZodError } from 'zod'

export const deletProducts = new Hono<HonoApp>().delete(
  '/products/:id',
  async ({ json, req }) => {
    try {
      const { id } = validate_id.parse(req.param)
      const productExist = await get_product_by_id({ id })

      if (!productExist) {
        return json(`Produto com ID ${id} não encontrada`, 404)
      }
      await delete_product_by_id(id)
      return json(
        { message: `Produto ${productExist.name} apagada com sucesso` },
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
