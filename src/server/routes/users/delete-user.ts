import { GetNextApiResponseParams } from '@/@types/params'
import { findUserById, updateUser } from '@/server/db/queries'
import { API_RESPONSE } from '@/utils/api-response'
import { validate_id } from '@/utils/validations/validate-id'
import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

export async function delete_user(
  req: Request,
  replay: GetNextApiResponseParams
) {
  try {
    const params = await replay.params
    const { id } = validate_id.parse(params)

    const userFounded = await findUserById({ id })

    if (!userFounded) {
      return API_RESPONSE(
        { error: 'Nenhum usuario com esse id foi encontrado' },
        404
      )
    }
    console.log({ replay: await replay.params })

    await updateUser(id, {
      isDeleted: true,
    })

    return NextResponse.json({ message: 'Usuario deletado com sucesso' })
  } catch (error) {
    console.error('Unhandled error:', error)
    if (error instanceof ZodError) {
      return API_RESPONSE(
        { error: error.issues.map(({ message }) => message) },
        400
      )
    }
    return API_RESPONSE({ error: (error as Error).message }, 500)
  }
}
