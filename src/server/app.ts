import { Hono } from 'hono'
import { cors } from 'hono/cors'

import { login } from './routes/authentication/sign-in'
import { ZodError } from 'zod'
import { NotAManagerError } from './routes/authentication/errors/not-a-manager-error'
import { UnauthorizedError } from './routes/authentication/errors/unauthorized-error'
import { InvalidCredencialError } from './routes/authentication/errors/invalid-credencials-error'
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getOneCategory,
  updateCategory,
} from './routes/categories'
import { createUser, getAllUsers, getOneUser, editUser } from './routes/users'
import { signOut } from './routes/authentication/sign-out'
import { authentication, jwtConfig } from './middlewares/authentication'
import { HonoApp } from '@/@types/Hono-types'
import {
  createProducts,
  deletProducts,
  getAllProducts,
  getOneProduct,
  updateProduct,
} from './routes/products'

export const app = new Hono<HonoApp>().basePath('/api')

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
  .route('/', signOut)
  .route('/', jwtConfig)
  .route('/', createUser)
  .route('/', getAllUsers)
  .route('/', getOneUser)
  .route('/', editUser)
  .route('/', createCategory)
  .route('/', deleteCategory)
  .route('/', getAllCategories)
  .route('/', getOneCategory)
  .route('/', updateCategory)
  .route('/', createProducts)
  .route('/', deletProducts)
  .route('/', updateProduct)
  .route('/', getOneProduct)
  .route('/', getAllProducts)
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
    console.log('ss', error.message)
    return json({ error, message: error.message }, 500)
  })
