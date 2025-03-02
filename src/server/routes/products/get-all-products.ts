import { list_all_products } from '@/server/db/queries'
import { API_RESPONSE } from '@/utils/api-response'
import { DrizzleError } from 'drizzle-orm'

export async function get_all_products(req: Request) {
  try {
    const url = new URL(req.url)
    const page = parseInt(url.searchParams.get('page') || '1', 10)
    const limit = parseInt(url.searchParams.get('limit') || '10', 10)
    const search = url.searchParams.get('search') || ''
    const offset = (page - 1) * limit

    const { count, data } = await list_all_products({ limit, offset, search })

    return API_RESPONSE({
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
      return API_RESPONSE(
        { error: 'Falha na conexao com a base de dados' },
        500
      )
    }
    return API_RESPONSE(
      { error: (error as Error)?.message ? (error as Error)?.message : error },
      500
    )
  }
}
