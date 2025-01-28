import { GetParams } from '@/@types/params'
import { db } from '../connection'
import { categories, INewCategory } from '../schema'
import { sql } from 'drizzle-orm'

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
      ? ({ name }, { ilike }) => ilike(name, `%${search}%`)
      : undefined,
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
