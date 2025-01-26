import { api } from '@/lib/axios'

export async function signOut(): Promise<void> {
  await api.post('/sign-out')
}
