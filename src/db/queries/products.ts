import { db } from '../connection'
import { INewProducts, products } from '../schema'

export async function save_products({
  name,
  price,
  categoryId,
  description,
}: INewProducts) {
  const data = await db
    .insert(products)
    .values({
      name,
      price,
      categoryId,
      description,
    })
    .returning()
  return data
}
