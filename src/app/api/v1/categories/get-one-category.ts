import { GetNextApiResponseParams } from '@/@types/params'
import { get_category_by_id } from '@/db/queries'
import { API_RESPONSE } from '@/utils/api-response'
import { NextRequest } from 'next/server'

export async function get_one_category(
  _: NextRequest,
  replay: GetNextApiResponseParams
) {
  const id = (await replay.params).id

  const category = await get_category_by_id(id)

  if (!category) {
    return API_RESPONSE('Category not found', 404)
  }

  return API_RESPONSE(
    {
      category,
    },
    200
  )
}
