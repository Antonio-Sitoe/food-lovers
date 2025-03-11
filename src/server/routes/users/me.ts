import { db } from '@/server/db/connection'
import { Hono } from 'hono'
import { HonoApp } from '@/@types/Hono-types'

export const getProfile = new Hono<HonoApp>().get(
  '/me',
  async ({ get, json }) => {
    const getCurrentUser = get('getCurrentUser')
    const { id } = await getCurrentUser()

    if (!id) {
      throw new Error('User not found.')
    }

    const user = await db.query.users.findFirst({
      where(fields, { eq }) {
        return eq(fields.id, id)
      },
    })

    if (!user) {
      throw new Error('User not found.')
    }

    return json({ user }, 200)
  }
)
