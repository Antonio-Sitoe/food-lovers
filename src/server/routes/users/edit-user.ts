import { findUserByEmail, findUserById, updateUser } from '@/server/db/queries'
import { ZodError } from 'zod'
import { IUserType } from '@/server/db/schema'
import bcrypt from 'bcryptjs'
import { removeProperty } from '@/utils/remove-properties'
import { validate_id } from '@/utils/validations/validate-id'
import {
  only_email_schema,
  only_role_schema,
} from '@/utils/validations/user-schema'
import { Hono } from 'hono'

export const editUser = new Hono().patch(
  '/users/:id',
  async ({ req, json }) => {
    try {
      const { id } = validate_id.parse(req.param())

      const { email, name, password, phone, role } =
        (await req.json()) as IUserType

      const userFounded = await findUserById({ id })

      if (!userFounded) {
        return json({ error: 'Nenhum usuario com esse id foi encontrado' }, 404)
      }

      if (email) {
        only_email_schema.parse({ email })

        const userWithEmail = await findUserByEmail({ email })

        if (userWithEmail && userWithEmail.id !== id) {
          return json({ error: 'Email já está em uso' }, 400)
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

      return json(
        {
          message: 'Usuario atualizado com sucesso',
          data: removeProperty(user[0], ['password', 'isDeleted']),
        },
        201
      )
    } catch (error) {
      console.log(error)

      if (error instanceof ZodError) {
        return json({ error: error.issues.map(({ message }) => message) }, 400)
      }

      return json({ error }, 500)
    }
  }
)
