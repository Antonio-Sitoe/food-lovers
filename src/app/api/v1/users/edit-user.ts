import { GetNextApiResponseParams } from '@/@types/params'
import { findUserByEmail, findUserById, updateUser } from '@/db/queries'
import { API_RESPONSE } from '@/utils/api-response'
import { z, ZodError } from 'zod'
import { user_schema } from '@/utils/validations/user-schema'
import { IUserType } from '@/db/schema'
import bcrypt from 'bcryptjs'
import { removeProperty } from '@/utils/remove-properties'

const paramsSchema = z.object({
  id: z.string({ required_error: 'id is required' }),
})

const only_role_schema = user_schema.pick({ role: true })

const only_email_schema = user_schema.pick({ email: true })

export async function edit_user(
  req: Request,
  replay: GetNextApiResponseParams
) {
  try {
    const params = await replay.params
    const { id } = paramsSchema.parse(params)

    const { email, name, password, phone, role } =
      (await req.json()) as IUserType

    const userFounded = await findUserById({ id })

    if (!userFounded) {
      return API_RESPONSE(
        { error: 'Nenhum usuario com esse email foi encontrado' },
        404
      )
    }

    if (email) {
      only_email_schema.parse({ email })

      const userWithEmail = await findUserByEmail({ email })

      if (userWithEmail && userWithEmail.id !== id) {
        return API_RESPONSE({ error: 'Email já está em uso' }, 400)
      }
    }

    if (role) {
      only_role_schema.parse({ role })
    }

    let passwordHash = userFounded.password

    if (password) {
      const salt = bcrypt.genSaltSync(5)
      passwordHash = await bcrypt.hash(password, salt)
    }

    const user: IUserType[] = await updateUser(id, {
      email,
      name,
      password: passwordHash,
      phone,
      role,
    })

    return API_RESPONSE(
      {
        message: 'Usuario atualizado com sucesso',
        data: removeProperty(user[0], ['password', 'isDeleted']),
      },
      201
    )
  } catch (error) {
    console.log(error)

    if (error instanceof ZodError) {
      return API_RESPONSE(
        { error: error.issues.map(({ message }) => message) },
        400
      )
    }

    return API_RESPONSE({ error }, 500)
  }
}
