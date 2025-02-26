import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { createUser, editUser, getAllUsers, getOneUser } from './routes/users'
import { login } from './routes/authentication/sign-in'
import { authentication, jwtConfig } from './middlewares/authentication'
import { UnauthorizedError } from './routes/authentication/errors/unauthorized-error'
import { NotAManagerError } from './routes/authentication/errors/not-a-manager-error'
import { ZodError } from 'zod'
import { InvalidCredencialError } from './routes/authentication/errors/invalid-credencials-error'
import { jwt } from 'hono/jwt'
import { env } from '@/lib/env'

export const app = new Hono().basePath('/api')

app
  .use(
    '*',
    cors({
      origin: '*',
    })
  )
  .notFound((c) => c.json({ error: 'Not Found' }, 404))
  .route('/', authentication)
  .route('/', login)
  .route('/', jwtConfig)
  .route('/', createUser)
  .route('/', getAllUsers)
  .route('/', getOneUser)
  .route('/', editUser)
  .onError((error, { json }) => {
    if (error instanceof UnauthorizedError) {
      return json({ message: error.message }, 401)
    } else if (error instanceof NotAManagerError) {
      return json({ message: error.message }, 401)
    } else if (error instanceof ZodError) {
      return json({ error: error.issues.map(({ message }) => message) }, 400)
    } else if (error instanceof InvalidCredencialError) {
      return json({ error: error.message }, 401)
    }

    console.log('ss', error)
    return json({ error }, 500)
  })
