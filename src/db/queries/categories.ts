import { db } from '../connection'
import { categories, INewCategory } from '../schema'

export async function createCategory(category: INewCategory) {
  try {
    await db.insert(categories).values(category)
  } catch (error) {
    console.error(error)
  }
}
