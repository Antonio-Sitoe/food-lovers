import { GetNextApiResponseParams } from '@/@types/params'
import { get_category_by_id, delete_category_by_id } from '@/db/queries'
import { API_RESPONSE } from '@/utils/api-response'
import { ZodError } from 'zod'

export async function delete_category(
  _: Request,
  { params }: GetNextApiResponseParams
) {
  try {
    const id = (await params).id
    const existingCategory = await get_category_by_id(`${id}`)
    if (!existingCategory) {
      return API_RESPONSE(`Categoria com ID ${id} não encontrada`, 404)
    }
    await delete_category_by_id(id)
    return API_RESPONSE({ message: 'Categoria apagada com sucesso' }, 200)
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
