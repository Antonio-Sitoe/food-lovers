import cookie from '@elysiajs/cookie'
import jwt from '@elysiajs/jwt'
import { env } from '@/env'

import { z } from 'zod'

import { NotAManagerError } from '../routes/authentication/errors/not-a-manager-error'

import { UnauthorizedError } from '../routes/authentication/errors/unauthorized-error'
import { Hono } from 'hono'

const jwtPayloadSchema = t.Object({
  sub: t.String(),
})

export const authentication = new Hono()
  .onError((error, { json }) => {
    if (error instanceof UnauthorizedError) {
      return json({ message: error.message }, 401)
    } else if (error instanceof NotAManagerError) {
      return json({ message: error.message }, 401)
    }
  })
  .use(
    jwt({
      name: 'jwt',
      secret: env.JWT_SECRET_KEY,
      schema: jwtPayloadSchema,
    })
  )
  .use(cookie())
  .derive(({ jwt, cookie, setCookie, removeCookie }) => {
    return {
      getCurrentUser: async () => {
        const payload = await jwt.verify(cookie.auth)

        if (!payload) {
          throw new UnauthorizedError()
        }

        return payload
      },
      signUser: async (payload: Static<typeof jwtPayloadSchema>) => {
        setCookie('auth', await jwt.sign(payload), {
          httpOnly: true,
          maxAge: 7 * 86400,
          path: '/',
        })
      },
      signOut: () => {
        removeCookie('auth')
      },
    }
  })
