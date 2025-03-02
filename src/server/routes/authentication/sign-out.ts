import { HonoApp } from '@/@types/Hono-types'
import { Hono } from 'hono'

export const signOut = new Hono<HonoApp>().post(
  '/sign-out',
  async ({ get }) => {
    const signOut = get('signOut')
    signOut()
  }
)
