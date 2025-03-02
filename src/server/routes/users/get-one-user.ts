import { getUserById } from '@/server/db/queries'
import { API_RESPONSE } from '@/utils/api-response'
import { Hono } from 'hono'

export const getOneUser = new Hono().get('/users/:id', async (c) => {
  const { id } = c.req.param()

  const User = await getUserById({ id })

  if (!User) {
    return API_RESPONSE('User not found', 404)
  }

  return c.json(
    {
      user: User,
    },
    200
  )
})
