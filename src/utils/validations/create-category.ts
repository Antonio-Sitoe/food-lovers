import { z } from 'zod'

export const category_schema = z.object({
  id: z.string().optional(),
  name: z.string({ message: 'Digite o nome' }),
  description: z.string().optional(),
})
