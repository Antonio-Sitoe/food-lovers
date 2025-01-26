import { createCategory } from '@/db/queries'
import { z } from 'zod'

const schema = z.object({
  name: z.string({ message: 'Digite o nome' }),
  description: z.string().optional(),
})

export async function POST(request: Request) {
  const category = await request.json()

  const { name, description } = schema.parse(category)

  await createCategory({
    name,
    description,
  })

  return new Response('Hello, Next.js!', {
    status: 200,
  })
}
