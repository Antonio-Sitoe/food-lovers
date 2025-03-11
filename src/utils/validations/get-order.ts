import { z } from 'zod'
import { orderStatusEnum } from '@/server/db/schema'

export const getOrderSchema = z.object({
  customerName: z.string().optional(),
  orderId: z.string().optional(),
  status: z.enum([...orderStatusEnum.enumValues]).optional(),
  pageIndex: z.number().min(0),
})
