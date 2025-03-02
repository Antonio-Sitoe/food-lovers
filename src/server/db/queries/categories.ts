import { GetParams } from '@/@types/params'
import { db } from '../connection'
import { categories, INewCategory, products } from '../schema'
import { z } from 'zod'
import { category_schema } from '@/utils/validations/create-category'
import { eq } from 'drizzle-orm'

export async function save_category(category: INewCategory) {
  const categorySaved = await db.insert(categories).values(category).returning()
  return categorySaved
}

export async function search_category_by_name(name: string) {
  const category = await db.query.categories.findFirst({
    where(fields, { eq }) {
      return eq(fields.name, name)
    },
  })
  return category
}

export async function list_all_categories({
  limit,
  offset,
  search,
}: GetParams) {
  const categoriesList = await db.query.categories.findMany({
    where: search
      ? ({ name, isDeleted }, { ilike, and, eq }) =>
          and(ilike(name, `%${search}%`), eq(isDeleted, false))
      : ({ isDeleted }, { eq }) => eq(isDeleted, false),
    orderBy: ({ createdAt }, { asc }) => asc(createdAt),
    limit,
    offset,
  })

  const count = await db.$count(categories)
  return {
    data: categoriesList,
    count,
  }
}

export async function get_category_by_id(id: string) {
  const categoryFounded = await db.query.categories.findFirst({
    where: (category, { eq, and }) =>
      and(eq(category.id, id), eq(category.isDeleted, false)),
  })
  return categoryFounded
}

export async function update_category_on_db(
  id: string,
  { name, description }: z.infer<typeof category_schema>
) {
  return await db
    .update(categories)
    .set({
      name,
      description,
    })
    .where(eq(categories.id, id))
    .returning()
}

export async function delete_category_by_id(id: string) {
  await db.transaction(async (trx) => {
    await trx
      .update(categories)
      .set({
        isDeleted: true,
      })
      .where(eq(categories.id, id))
    await trx
      .update(products)
      .set({
        isDeleted: true,
      })
      .where(eq(products.categoryId, id))
  })
}
