import { GetNextApiResponseParams } from '@/@types/params'
import {
  get_category_by_id,
  get_product_by_id,
  update_product_on_db,
} from '@/db/queries'
import { API_RESPONSE } from '@/utils/api-response'
import { productsSchema } from '@/utils/validations/products'
import { ZodError } from 'zod'

export async function update_product(
  request: Request,
  { params }: GetNextApiResponseParams
) {
  const product = await request.json()
  try {
    const id = (await params).id
    const { name, description, categoryId, price } =
      productsSchema.parse(product)

    const existingCategory = await get_category_by_id(categoryId)
    if (!existingCategory) {
      return API_RESPONSE(`Categoria com ID ${id} não encontrada`, 404)
    }

    const productExist = await get_product_by_id({ id })

    if (!productExist) {
      return API_RESPONSE(`Produto com ID ${id} não encontrada`, 404)
    }

    const updatedProduct = await update_product_on_db(id, {
      name,
      description,
      categoryId,
      price,
    })

    return API_RESPONSE(
      { message: 'Produto atualizado com sucesso', data: updatedProduct },
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
      return API_RESPONSE({ error: 'Já existe um Produto com esse nome.' }, 409)
    }
    console.error('Unhandled error:', error)
    return API_RESPONSE({ error: error }, 500)
  }
}
