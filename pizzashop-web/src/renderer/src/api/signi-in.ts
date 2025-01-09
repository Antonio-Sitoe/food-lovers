import { api } from '@/lib/axios'

export interface SignInRequest {
  email: string
}

export async function signIn({ email }: SignInRequest): Promise<void> {
  await api.post('/authenticate', { email })
}
