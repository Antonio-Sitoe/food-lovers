import { IUserType, users } from '../schema'
import { db } from '../connection'
import { GetParams } from '@/@types/params'
import { ENUM_USER_ROLE } from '@/@types/enum-user-role'
import { eq } from 'drizzle-orm'

export async function findUserByEmail({ email }: Pick<IUserType, 'email'>) {
  return await db.query.users.findFirst({
    where: (user, { eq, and }) =>
      and(eq(user.email, email), eq(user.isDeleted, false)),
  })
}

export async function findUserById({ id }: { id: string }) {
  return await db.query.users.findFirst({
    where: (user, { eq, and }) =>
      and(eq(user.id, id), eq(user.isDeleted, false)),
  })
}

export async function saveUser({
  email,
  name,
  password,
  role,
  phone,
}: IUserType) {
  return await db
    .insert(users)
    .values({
      email,
      name,
      password,
      role,
      phone,
    })
    .returning()
}

interface listAllParams extends GetParams {
  role?: keyof typeof ENUM_USER_ROLE
}

export async function list_all_users({
  limit,
  offset,
  search,
  role: userRole,
}: listAllParams) {
  const usersList = await db.query.users.findMany({
    where: search
      ? ({ name, isDeleted, role }, { ilike, and, eq }) =>
          and(
            ilike(name, `%${search}%`),
            eq(isDeleted, false),
            userRole && eq(role, userRole)
          )
      : ({ isDeleted, role }, { eq, and }) => {
          return userRole
            ? and(eq(isDeleted, false), eq(role, userRole))
            : eq(isDeleted, false)
        },
    orderBy: ({ updatedAt }, { desc }) => desc(updatedAt),
    limit,
    offset,
    columns: {
      email: true,
      id: true,
      name: true,
      phone: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  })

  const count = await db.$count(users)
  return {
    data: usersList,
    count,
  }
}

export async function getUserById({ id }: { id: string }) {
  const user = await db.query.users.findFirst({
    where: (users, { eq, and }) =>
      and(eq(users.id, id), eq(users.isDeleted, false)),
    columns: {
      id: true,
      email: true,
      name: true,
      role: true,
      phone: true,
      createdAt: true,
      updatedAt: true,
    },
  })
  return user
}

export async function updateUser(
  id: string,
  { email, name, password, phone, role }: Partial<IUserType>
) {
  const updateData: Partial<IUserType> = {}
  if (email !== undefined) updateData.email = email
  if (name !== undefined) updateData.name = name
  if (password !== undefined) updateData.password = password
  if (phone !== undefined) updateData.phone = phone
  if (role !== undefined) updateData.role = role
  updateData.updatedAt = new Date()
  return db.update(users).set(updateData).where(eq(users.id, id)).returning()
}
