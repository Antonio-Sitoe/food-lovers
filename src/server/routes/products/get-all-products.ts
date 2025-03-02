import { list_all_products } from '@/server/db/queries'
import { DrizzleError } from 'drizzle-orm'
import { Hono } from 'hono'

export const getAllProducts = new Hono().get(
  '/products',
  async ({ req, json }) => {
    try {
      const url = new URL(req.url)
      const page = parseInt(url.searchParams.get('page') || '1', 10)
      const limit = parseInt(url.searchParams.get('limit') || '10', 10)
      const search = url.searchParams.get('search') || ''
      const offset = (page - 1) * limit

      const { count, data } = await list_all_products({ limit, offset, search })

      return json({
        data,
        pagination: {
          total: count,
          page,
          limit,
          totalPages: Math.ceil(count / limit),
        },
      })
    } catch (error) {
      if (error instanceof DrizzleError) {
        return json({ error: 'Falha na conexao com a base de dados' }, 500)
      }
      return json(
        {
          error: (error as Error)?.message ? (error as Error)?.message : error,
        },
        500
      )
    }
  }
)
