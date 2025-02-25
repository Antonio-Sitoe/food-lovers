import { findUserByEmail, saveUser } from '@/db/queries'
import { removeProperty } from '@/utils/remove-properties'
import { user_schema } from '@/utils/validations/user-schema'
import * as bCrypt from 'bcryptjs'
import { Hono } from 'hono'
import { ZodError } from 'zod'

export const createUser = new Hono().post('/users', async ({ req, json }) => {
  try {
    const response = await req.json()
    const {
      email,
      name,
      password,
      phone,
      role = 'customer',
    } = user_schema.parse(response)

    const userFounded = await findUserByEmail({ email })
    if (userFounded) throw new Error('Ja exite um usuario com esse email')

    const salt = bCrypt.genSaltSync(5)
    const password_hashed = await bCrypt.hash(password, salt)

    const user = await saveUser({
      name,
      email,
      password: password_hashed,
      phone,
      role,
    })

    return json(
      {
        message: 'Usuario criado com sucesso',
        data: user.map((item) => {
          return removeProperty(item, ['password', 'isDeleted'])
        }),
      },
      200
    )
  } catch (error) {
    if (error instanceof ZodError) {
      return json({ error: error.issues.map(({ message }) => message) }, 400)
    }

    return json({ error: (error as Error)?.message || error }, 500)
  }
})
