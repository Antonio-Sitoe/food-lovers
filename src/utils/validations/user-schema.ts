import { z } from 'zod'

export const user_schema = z.object({
  id: z.string().optional(),
  name: z.string({ required_error: 'Campo nome deve estar preenchido' }),
  phone: z.string({ required_error: 'Adicione um numero de telefone' }),
  email: z
    .string({ required_error: 'Adicione um email' })
    .email('Email deve ser valido'),
  role: z.enum(['customer', 'admin', 'manager'], {
    required_error: 'Adicione uma função do utilizador',
  }),
  password: z
    .string({ required_error: 'Adicione uma senha' })
    .min(4, 'A senha deve ter no maximo 4 caracteres'),
})

export const only_role_schema = user_schema.pick({ role: true })

export const only_email_schema = user_schema.pick({ email: true })
