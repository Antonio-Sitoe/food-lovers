import { GetNextApiResponseParams } from '@/@types/params'
import { getUserById } from '@/db/queries'
import { API_RESPONSE } from '@/utils/api-response'
import { NextRequest } from 'next/server'

export async function get_one_user(
  _: NextRequest,
  replay: GetNextApiResponseParams
) {
  const id = (await replay.params).id

  const User = await getUserById({ id })

  if (!User) {
    return API_RESPONSE('User not found', 404)
  }

  return API_RESPONSE(
    {
      user: User,
    },
    200
  )
}
