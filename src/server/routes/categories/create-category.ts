import { save_category, search_category_by_name } from '@/server/db/queries'
import { API_RESPONSE } from '@/utils/api-response'
import { category_schema } from '@/utils/validations/create-category'
import { ZodError } from 'zod'

export async function create_category(request: Request) {
  const category = await request.json()
  try {
    const { name, description } = category_schema.parse(category)

    const hasCategory = await search_category_by_name(name)

    if (hasCategory) {
      return API_RESPONSE(`Já existe uma categoria com o nome ${name}`, 409)
    }
    const new_category = await save_category({
      name,
      description,
    })
    return API_RESPONSE(
      { message: 'Categoria criada com sucesso', data: new_category },
      200
    )
  } catch (error) {
    if (error instanceof ZodError) {
      return API_RESPONSE(
        { error: error.issues.map(({ message }) => message) },
        400
      )
    }
    console.error('Unhandled error:', error)
    return API_RESPONSE({ error: error }, 500)
  }
}
