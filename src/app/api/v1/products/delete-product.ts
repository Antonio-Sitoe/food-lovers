import { GetNextApiResponseParams } from '@/@types/params'
import { delete_product_by_id, get_product_by_id } from '@/db/queries'
import { API_RESPONSE } from '@/utils/api-response'
import { ZodError } from 'zod'

export async function delete_product(
  _: Request,
  { params }: GetNextApiResponseParams
) {
  try {
    const id = (await params).id
    const productExist = await get_product_by_id({ id })

    if (!productExist) {
      return API_RESPONSE(`Produto com ID ${id} não encontrada`, 404)
    }
    await delete_product_by_id(id)
    return API_RESPONSE(
      { message: `Produto ${productExist.name} apagada com sucesso` },
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
