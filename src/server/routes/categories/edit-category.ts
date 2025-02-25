import { GetNextApiResponseParams } from '@/@types/params'
import { update_category_on_db, get_category_by_id } from '@/db/queries'
import { API_RESPONSE } from '@/utils/api-response'
import { category_schema } from '@/utils/validations/create-category'
import { ZodError } from 'zod'

export async function update_category(
  request: Request,
  { params }: GetNextApiResponseParams
) {
  const categoryUpdate = await request.json()
  try {
    const id = (await params).id
    const { name, description } = category_schema.parse(categoryUpdate)

    // Verifica se a categoria existe pelo ID
    const existingCategory = await get_category_by_id(`${id}`)
    if (!existingCategory) {
      return API_RESPONSE(`Categoria com ID ${id} não encontrada`, 404)
    }

    const updatedCategory = await update_category_on_db(id, {
      name,
      description,
    })

    return API_RESPONSE(
      { message: 'Categoria atualizada com sucesso', data: updatedCategory },
      200
    )
  } catch (error) {
    if (error instanceof ZodError) {
      return API_RESPONSE(
        { error: error.issues.map(({ message }) => message) },
        400
      )
    }
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === '23505'
    ) {
      return API_RESPONSE(
        { error: 'Já existe uma categoria com esse nome.' },
        409
      )
    }
    console.error('Unhandled error:', error)
    return API_RESPONSE({ error: error }, 500)
  }
}
