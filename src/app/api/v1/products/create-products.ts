import { get_category_by_id, save_products } from '@/db/queries'
import { API_RESPONSE } from '@/utils/api-response'
import { productsSchema } from '@/utils/validations/products'
import { ZodError } from 'zod'

export async function createProducts(req: Request) {
  try {
    const data = await req.json()

    const { categoryId, name, price, description } = productsSchema.parse(data)

    const hasCategoryExist = await get_category_by_id(categoryId)
    if (!hasCategoryExist) throw new Error('Category does not exist')

    const product = await save_products({
      name,
      price,
      description,
      categoryId,
    })

    console.log({ product })

    return API_RESPONSE(
      { message: 'Producto criado com sucesso', data: product },
      200
    )
  } catch (error) {
    if (error instanceof ZodError) {
      return API_RESPONSE(
        { error: error.issues.map(({ message }) => message) },
        400
      )
    }
    console.log({ error })
    return API_RESPONSE({ error: error }, 500)
  }
}
