import { get_category_by_id, save_products } from '@/db/queries'
import { API_RESPONSE } from '@/utils/api-response'
import { productsSchema } from '@/utils/validations/products'
import { ZodError } from 'zod'
import { CategoryNotExistError } from '../../errors/categoryNotExist'
import { PostgresError } from '@/@types/postgress'

export async function create_products(req: Request) {
  try {
    const data = await req.json()

    const { categoryId, name, price, description } = productsSchema.parse(data)

    const hasCategoryExist = await get_category_by_id(categoryId)
    if (!hasCategoryExist) throw new CategoryNotExistError()

    const product = await save_products({
      name: name?.trim(),
      price,
      description,
      categoryId,
    })

    return API_RESPONSE(
      { message: 'Producto criado com sucesso', data: product },
      200
    )
  } catch (error) {
    if (error instanceof ZodError) {
      return API_RESPONSE({ error: error }, 400)
    }

    if ((error as PostgresError)?.code === '23505') {
      return API_RESPONSE({ error: 'Product name must be unique' }, 400)
    }

    return API_RESPONSE({ error: (error as Error)?.message || error }, 500)
  }
}
