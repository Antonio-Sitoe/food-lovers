import { GetParams } from '@/@types/params'
import { db } from '../connection'
import { INewProducts, products } from '../schema'
import { eq } from 'drizzle-orm'
import { productsSchema } from '@/utils/validations/products'
import { z } from 'zod'

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

export async function list_all_products({ limit, offset, search }: GetParams) {
  const productList = await db.query.products.findMany({
    where: search
      ? ({ name, isDeleted }, { ilike, and, eq }) =>
          and(ilike(name, `%${search}%`), eq(isDeleted, false))
      : ({ isDeleted }, { eq }) => eq(isDeleted, false),
    orderBy: ({ createdAt }, { asc }) => asc(createdAt),
    limit,
    offset,
  })

  const count = await db.$count(products)
  return {
    data: productList,
    count,
  }
}

export async function get_product_by_id({ id }: { id: string }) {
  const productsFounded = await db.query.products.findFirst({
    where: (products, { eq, and }) =>
      and(eq(products.id, id), eq(products.isDeleted, false)),
  })
  return productsFounded
}

export async function delete_product_by_id(id: string) {
  await db
    .update(products)
    .set({
      isDeleted: true,
    })
    .where(eq(products.id, id))
}

export async function update_product_on_db(
  id: string,
  { name, description, categoryId, price }: z.infer<typeof productsSchema>
) {
  return await db
    .update(products)
    .set({
      name,
      description,
      categoryId,
      price,
    })
    .where(eq(products.id, id))
    .returning()
}
