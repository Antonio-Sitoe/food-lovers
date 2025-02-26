import { findUserByEmail } from '@/db/queries'
import { Hono } from 'hono'
import { compare } from 'bcryptjs'

import { InvalidCredencialError } from './errors/invalid-credencials-error'
import { z } from 'zod'
import { HonoApp } from '@/@types/Hono-types'
import { removeProperty } from '@/utils/remove-properties'

const login_schema = z.object({
  email: z
    .string({ required_error: 'Informe um email' })
    .email({ message: 'Digite um email valido' }),
  password: z.string({ required_error: 'Informe uma senha' }),
})

export const login = new Hono<HonoApp>().post(
  '/sign-in',
  async ({ req, json, get }) => {
    const data = await req.json()
    const { email, password } = login_schema.parse(data)

    const user = await findUserByEmail({ email })

    if (!user) throw new InvalidCredencialError()

    const does_password_matches = await compare(password, user.password)

    if (!does_password_matches) throw new InvalidCredencialError()

    await get('signUser')({ sub: user.id })

    return json({
      message: 'Logado com sucesso',
      user: removeProperty(user, ['isDeleted', 'password']),
    })
  }
)
