import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { login } from './routes/authentication/sign-in'
import { signOut } from './routes/authentication/sign-out'
import { ZodError } from 'zod'
import { NotAManagerError } from './routes/authentication/errors/not-a-manager-error'
import { UnauthorizedError } from './routes/authentication/errors/unauthorized-error'
import { InvalidCredentialsError } from './routes/authentication/errors/invalid-credencials-error'

import {
  createUser,
  getAllUsers,
  getOneUser,
  editUser,
  getProfile,
  deleteUser,
} from './routes/users'

import { authentication, jwtConfig } from './middlewares/authentication'
import { HonoApp } from '@/@types/Hono-types'

import {
  CreateOrders,
  approveOrder,
  cancelOrder,
  deliverOrder,
  dispatchOrder,
  getOrderDetails,
  getOrders,
} from './routes/order'

import {
  getDailyReceiptInPeriod,
  getDayOrdersAmount,
  getMonthCanceledOrdersAmount,
  getMonthOrdersAmount,
  getMonthReceipt,
  getPopularProducts,
} from './routes/reports'

import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getOneCategory,
  updateCategory,
} from './routes/categories'

import {
  createProducts,
  deleteProducts,
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
  .route('/', deleteUser)
  .route('/', getProfile)
  .route('/', createCategory)
  .route('/', deleteCategory)
  .route('/', getAllCategories)
  .route('/', getOneCategory)
  .route('/', updateCategory)
  .route('/', createProducts)
  .route('/', deleteProducts)
  .route('/', updateProduct)
  .route('/', getOneProduct)
  .route('/', getAllProducts)
  .route('/', CreateOrders)
  .route('/', getDailyReceiptInPeriod)
  .route('/', getDayOrdersAmount)
  .route('/', getMonthCanceledOrdersAmount)
  .route('/', getMonthOrdersAmount)
  .route('/', getMonthReceipt)
  .route('/', getPopularProducts)
  .route('/', approveOrder)
  .route('/', cancelOrder)
  .route('/', deliverOrder)
  .route('/', dispatchOrder)
  .route('/', getOrderDetails)
  .route('/', getOrders)
  .onError((error, { json }) => {
    if (error instanceof UnauthorizedError) {
      return json({ message: error.message }, 401)
    } else if (error instanceof NotAManagerError) {
      return json({ message: error.message }, 401)
    } else if (error instanceof ZodError) {
      return json({ error: error.issues.map(({ message }) => message) }, 400)
    } else if (error instanceof InvalidCredentialsError) {
      return json({ error: error.message }, 401)
    }
    console.log('[ERRO GENERICO]', error.message)
    return json({ error, message: error.message }, 500)
  })
