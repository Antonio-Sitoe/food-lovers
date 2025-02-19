import { findUserByEmail, saveUser } from '@/db/queries'
import { API_RESPONSE } from '@/utils/api-response'
import { removeProperty } from '@/utils/remove-properties'
import { user_schema } from '@/utils/validations/user-schema'
import * as bCrypt from 'bcryptjs'
import { ZodError } from 'zod'

export async function create_user(req: Request) {
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

    return API_RESPONSE(
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
      return API_RESPONSE(
        { error: error.issues.map(({ message }) => message) },
        400
      )
    }

    return API_RESPONSE({ error: (error as Error)?.message || error }, 500)
  }
}
