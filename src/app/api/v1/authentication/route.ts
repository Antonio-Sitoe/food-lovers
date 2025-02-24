import cookie from '@elysiajs/cookie'
import jwt from '@elysiajs/jwt'
import { env } from '@/env'

import { z } from 'zod'

import { NotAManagerError } from './errors/not-a-manager-error'
import { NextRequest, NextResponse } from 'next/server'
import { UnauthorizedError } from './errors/unauthorized-error'
import { findUserByEmail } from '@/db/queries'
import { compare } from 'bcryptjs'
import { InvalidCredencialError } from './errors/invalid-credencials-error'

const jwtPayloadSchema = t.Object({
  sub: t.String(),
  restaurantId: t.Optional(t.String()),
})

export const authentication = new Elysia()
  .error({
    UNAUTHORIZED: UnauthorizedError,
    NOT_A_MANAGER: NotAManagerError,
  })
  .onError(({ code, error, set }) => {
    switch (code) {
      case 'UNAUTHORIZED':
        set.status = 401
        return { code, message: error.message }
      case 'NOT_A_MANAGER':
        set.status = 401
        return { code, message: error.message }
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
  .derive(({ getCurrentUser }) => {
    return {
      getManagedRestaurantId: async () => {
        const { restaurantId } = await getCurrentUser()

        if (!restaurantId) {
          throw new NotAManagerError()
        }

        return restaurantId
      },
    }
  })

const login_schema = z.object({
  email: z
    .string({ required_error: 'Informe um email' })
    .email({ message: 'Digite um email valido' }),
  password: z.string({ required_error: 'Informe uma senha' }),
})

export const POST = async (req: Request) => {
  const data = await req.json()
  const { email, password } = login_schema.parse(data)

  console.log('Logado com sucesso', { email, password })

  const user = await findUserByEmail({ email })

  if (!user) throw new InvalidCredencialError()

  const does_password_matches = await compare(password, user.password)

  if (!does_password_matches) throw new InvalidCredencialError()

  return NextResponse.json({ message: 'Logado com sucesso' })
}
