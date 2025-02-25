import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { createUser, editUser, getAllUsers, getOneUser } from './routes/users'
import { login } from './routes/authentication/sign-in'

export const app = new Hono().basePath('/api')

app.use(
  '*',
  cors({
    origin: '*',
  })
)

app.notFound((c) => c.json({ error: 'Not Found' }, 404))

app.route('/', login)
app.route('/', createUser)
app.route('/', getAllUsers)
app.route('/', getOneUser)
app.route('/', editUser)

app.onError(() => {
  return new Response(null, { status: 500 })
})
