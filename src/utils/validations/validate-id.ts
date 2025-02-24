import { z } from 'zod'

export const validate_id = z.object({
  id: z.string({ required_error: 'Adicione o id' }),
})
