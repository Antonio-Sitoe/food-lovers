import Elysia from 'elysia'
import { authentication } from '../../v1/authentication/route'

export const signOut = new Elysia()
  .use(authentication)
  .post('/sign-out', async ({ signOut }) => {
    signOut()
  })
