import { api } from '@/lib/axios'

interface getProfileProps {
  id: string
  name: string
  email: string
  phone: string | null
  role: 'manager' | 'customer'
  createdAt: Date | null
  updatedAt: Date | null
}
export async function getProfile(): Promise<getProfileProps> {
  const { data } = await api.get('/me')
  return data
}
