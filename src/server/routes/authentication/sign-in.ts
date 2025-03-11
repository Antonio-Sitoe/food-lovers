import { findUserByEmail } from '@/server/db/queries'
import { Hono } from 'hono'
import { compare } from 'bcryptjs'
import { HonoApp } from '@/@types/Hono-types'
import { signSchema } from '@/utils/validations/sign-in'
import { removeProperty } from '@/utils/remove-properties'
import { InvalidCredentialsError } from './errors/invalid-credencials-error'

export const login = new Hono<HonoApp>().post(
  '/sign-in',
  async ({ req, json, get }) => {
    const data = await req.json()
    const { email, password } = signSchema.parse(data)

    const user = await findUserByEmail({ email })

    if (!user) throw new InvalidCredentialsError()

    const does_password_matches = await compare(password, user.password)

    if (!does_password_matches) throw new InvalidCredentialsError()

    const { token } = await get('signUser')({ sub: user.id })

    return json({
      message: 'Logado com sucesso',
      user: removeProperty(user, ['isDeleted', 'password']),
      token,
    })
  }
)
