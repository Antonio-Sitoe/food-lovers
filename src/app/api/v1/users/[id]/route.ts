import { delete_user } from '../delete-user'
import { edit_user } from '../edit-user'
import { get_one_user } from '../get-one-user'

export const GET = get_one_user
export const PATCH = edit_user
export const DELETE = delete_user
