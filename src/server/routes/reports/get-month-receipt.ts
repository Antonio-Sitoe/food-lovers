import { and, gte, sql, sum } from 'drizzle-orm'
import dayjs from 'dayjs'
import { db } from '@/server/db/connection'
import { orders } from '@/server/db/schema'
import { Hono } from 'hono'
import { HonoApp } from '@/@types/Hono-types'

export const getMonthReceipt = new Hono<HonoApp>().get(
  '/metrics/month-receipt',
  async ({ json }) => {
    const today = dayjs()
    const lastMonth = today.subtract(1, 'month')
    const startOfLastMonth = lastMonth.startOf('month')

    /**
     * January is ZERO, that's why we need to sum 1 to get the actual month
     */
    const lastMonthWithYear = lastMonth.format('YYYY-MM')
    const currentMonthWithYear = today.format('YYYY-MM')

    const monthsReceipts = await db
      .select({
        monthWithYear: sql<string>`TO_CHAR(${orders.createdAt}, 'YYYY-MM')`,
        receipt: sum(orders.totalInCents).mapWith(Number),
      })
      .from(orders)
      .where(and(gte(orders.createdAt, startOfLastMonth.toDate())))
      .groupBy(sql`TO_CHAR(${orders.createdAt}, 'YYYY-MM')`)
      .having(({ receipt }) => gte(receipt, 1))

    const currentMonthReceipt = monthsReceipts.find((monthReceipt) => {
      return monthReceipt.monthWithYear === currentMonthWithYear
    })

    const lastMonthReceipt = monthsReceipts.find((monthReceipt) => {
      return monthReceipt.monthWithYear === lastMonthWithYear
    })

    const diffFromLastMonth =
      lastMonthReceipt && currentMonthReceipt
        ? (currentMonthReceipt.receipt * 100) / lastMonthReceipt.receipt
        : null

    return json({
      receipt: currentMonthReceipt?.receipt ?? 0,
      diffFromLastMonth: diffFromLastMonth
        ? Number((diffFromLastMonth - 100).toFixed(2))
        : 0,
    })
  }
)
