import { Helmet } from 'react-helmet-async'

import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import { useQuery } from '@tanstack/react-query'
import { getOrders } from '@/api/get-orders'
import { Pagination } from '@/components/ui/pagination'
import { OrderTableRow } from './order-table-row'
import { OrderTableFilters } from './order-table-filters'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'
import { OrdersTableSkeleton } from './orders-table-skeleton'

export function Orders(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams()

  const orderId = searchParams.get('orderId')
  const custumerName = searchParams.get('custumerName')
  const status = searchParams.get('status')

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const { data: results, isLoading } = useQuery({
    queryKey: ['orders', pageIndex, orderId, custumerName, status],
    queryFn: () => getOrders({ pageIndex, orderId, custumerName, status })
  })

  function handlePaginate(pageIndex: number): void {
    setSearchParams((searchparams) => {
      searchparams.set('page', (pageIndex + 1).toString())
      return searchparams
    })
  }

  return (
    <>
      <Helmet title="Pedidos" />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>

        <div className="space-y-2.5">
          <OrderTableFilters />
          <div className="border rounded-md mt-4">
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[140px]">Identificador</TableHead>
                  <TableHead className="w-[180px]">Realizado ha</TableHead>
                  <TableHead className="w-[140px]">Status</TableHead>
                  <TableHead>Clientes</TableHead>
                  <TableHead className="w-[140px]">Total pedidos</TableHead>
                  <TableHead className="w-[164px]"></TableHead>
                  <TableHead className="w-[132px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading && <OrdersTableSkeleton />}
                {results &&
                  results.orders.map((order) => {
                    return <OrderTableRow key={order.orderId} order={order} />
                  })}
              </TableBody>
            </Table>
          </div>
          {results && (
            <Pagination
              onPageChange={handlePaginate}
              perPage={results.meta.perPage}
              totalCount={results.meta.totalCount}
              pageIndex={results.meta.pageIndex}
            />
          )}
        </div>
      </div>
    </>
  )
}
