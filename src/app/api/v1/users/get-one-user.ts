import { GetNextApiResponseParams } from '@/@types/params'
import { get_product_by_id } from '@/db/queries'
import { API_RESPONSE } from '@/utils/api-response'
import { NextRequest } from 'next/server'

export async function get_one_product(
  _: NextRequest,
  replay: GetNextApiResponseParams
) {
  const id = (await replay.params).id

  const product = await get_product_by_id({ id })

  if (!product) {
    return API_RESPONSE('Product not found', 404)
  }

  return API_RESPONSE(
    {
      product,
    },
    200
  )
}
