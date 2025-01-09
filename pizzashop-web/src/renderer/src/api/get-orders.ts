import { api } from '@/lib/axios'

export type ORDER_STATUS = 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'

export interface OrderType {
  orderId: string
  createdAt: string
  status: ORDER_STATUS
  customerName: string
  total: number
}

export interface GetOrderResponse {
  orders: OrderType[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export interface getOrdersQuery {
  pageIndex?: number
  orderId: string | null
  custumerName: string | null
  status: string | null
}

export async function getOrders({
  pageIndex = 0,
  custumerName,
  orderId,
  status
}: getOrdersQuery): Promise<GetOrderResponse> {
  const { data } = await api.get('/orders', {
    params: {
      pageIndex: pageIndex ?? 0,
      custumerName,
      orderId,
      status: status === 'all' ? null : status
    }
  })
  return data
}
