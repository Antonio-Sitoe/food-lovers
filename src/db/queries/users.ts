import { IUserType, users } from '../schema'
import { db } from '../connection'
import { GetParams } from '@/@types/params'
import { ENUM_USER_ROLE } from '@/@types/enum-user-role'

export async function findUserByEmail({ email }: Pick<IUserType, 'email'>) {
  return await db.query.users.findFirst({
    where: (user, { eq, and }) =>
      and(eq(user.email, email), eq(user.isDeleted, false)),
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
