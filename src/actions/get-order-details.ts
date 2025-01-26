import { api } from '@/lib/axios'
import { OrderType } from './get-orders'

interface getOrders extends OrderType {
  totalInCents: number
  customer: {
    name: string
    email: string
    phone: string
  }
  orderItems: {
    id: string
    priceInCents: number
    quantity: number
    product: {
      name: string
    }
  }[]
}

export async function getOrderDetails({ id }: { id: string }): Promise<getOrders> {
  const { data } = await api.get('/orders/' + id)
  return data
}
