import { HonoApp } from '@/@types/Hono-types'
import { findUserById, updateUser } from '@/server/db/queries'
import { validate_id } from '@/utils/validations/validate-id'
import { Hono } from 'hono'
import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

export const deleteUser = new Hono<HonoApp>().delete(
  '/users',
  async ({ json, req }) => {
    try {
      const { id } = validate_id.parse(req.param())

      const userFounded = await findUserById({ id })

      if (!userFounded) {
        return json({ error: 'Nenhum usuario com esse id foi encontrado' }, 404)
      }

      await updateUser(id, {
        isDeleted: true,
      })

      return NextResponse.json({ message: 'Usuario deletado com sucesso' })
    } catch (error) {
      console.error('Unhandled error:', error)
      if (error instanceof ZodError) {
        return json({ error: error.issues.map(({ message }) => message) }, 400)
      }
      return json({ error: (error as Error).message }, 500)
    }
  }
)
