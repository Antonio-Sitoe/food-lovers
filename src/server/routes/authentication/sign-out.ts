import Elysia from 'elysia'
import { authentication } from '../../middlewares/authentication'

export const signOut = new Elysia()
  .use(authentication)
  .post('/sign-out', async ({ signOut }) => {
    signOut()
  })
