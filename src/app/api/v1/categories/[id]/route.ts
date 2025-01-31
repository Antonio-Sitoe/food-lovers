import { delete_category } from '../delete-category'
import { update_category } from '../edit-category'
import { get_one_category } from '../get-one-category'

export const GET = get_one_category
export const PATCH = update_category
export const DELETE = delete_category
