import { z } from 'zod'

export const signSchema = z.object({
  email: z
    .string({ required_error: 'Informe um email' })
    .email({ message: 'Digite um email valido' }),
  password: z.string({ required_error: 'Informe uma senha' }),
})
