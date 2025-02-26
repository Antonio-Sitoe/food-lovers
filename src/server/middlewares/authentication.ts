import { z } from 'zod'

import { env } from '@/lib/env'
import { Hono } from 'hono'
import { jwt, sign } from 'hono/jwt'
import { getCookie, setCookie, deleteCookie } from 'hono/cookie'

import { UnauthorizedError } from '../routes/authentication/errors/unauthorized-error'
import { HonoApp, jwtPayloadSchema } from '@/@types/Hono-types'

export const authentication = new Hono<HonoApp>().use('*', async (c, next) => {
  c.set('getCurrentUser', async () => {
    const token = getCookie(c, 'auth')
    if (!token) {
      throw new UnauthorizedError()
    }
    const payload = await c.get('jwtPayload')
    if (!payload) {
      throw new UnauthorizedError()
    }

    return payload
  })
  c.set('signUser', async (payload: z.infer<typeof jwtPayloadSchema>) => {
    const token = await sign(payload, env.JWT_SECRET_KEY)
    console.log('token', token)
    setCookie(c, 'auth', token, {
      httpOnly: true,
      maxAge: 7 * 86400, // 7 dias
      path: '/',
    })
  })
  c.set('signOut', () => {
    deleteCookie(c, 'auth')
  })
  await next()
})

export const jwtConfig = authentication.use(
  jwt({
    secret: env.JWT_SECRET_KEY,
  })
)
