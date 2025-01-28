import { list_all_categories } from '@/db/queries'
import { API_RESPONSE } from '@/utils/api-response'

export const get_all_categories = async (request: Request) => {
  try {
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1', 10)
    const limit = parseInt(url.searchParams.get('limit') || '10', 10)
    const search = url.searchParams.get('search') || ''
    const offset = (page - 1) * limit

    const { count, data } = await list_all_categories({ limit, offset, search })
    return API_RESPONSE({
      data,
      pagination: {
        total: count,
        page, // Página atual
        limit, // Registros por página
        totalPages: Math.ceil(count / limit), // Total de páginas
      },
    })
  } catch (error) {
    return API_RESPONSE({ error: error }, 500)
  }
}
