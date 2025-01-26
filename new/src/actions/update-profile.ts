import { api } from '@/lib/axios'

interface profile {
  description: string
  name: string
}
export async function updateProfile({ name, description }: profile): Promise<void> {
  await api.put('/profile', { name, description })
}
