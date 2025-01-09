import { api } from '@/lib/axios'

export interface DeliverOrderParams {
  orderId: string
}

export async function deliverOrder({ orderId }: DeliverOrderParams): Promise<void> {
  await api.patch(`/orders/${orderId}/deliver`)
}
