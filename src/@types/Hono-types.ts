import { IUserType } from '@/server/db/schema'
import type { JwtVariables } from 'hono/jwt'
import { z } from 'zod'

export const jwtPayloadSchema = z.object({
  sub: z.string(),
})

type Variables = JwtVariables & {
  getCurrentUser: () => Promise<IUserType>
  signUser: (
    payload: z.infer<typeof jwtPayloadSchema>
  ) => Promise<{ token: string }>
  signOut: () => void
}

export type HonoApp = {
  Variables: Variables
}
