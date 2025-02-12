import { z } from 'zod'

const errorMessages = {
  required_error: 'Este campo é obrigatório',
  invalid_type_error: 'Dados inválidos',
}

export const productsSchema = z.object({
  id: z.string(errorMessages).optional(),
  name: z.string({ required_error: 'Digite um nome' }),
  description: z.string(errorMessages).optional(),
  price: z.number({ required_error: 'Selecione um preco valido' }),
  categoryId: z.string({ required_error: 'Selecione uma categoria' }),
})
