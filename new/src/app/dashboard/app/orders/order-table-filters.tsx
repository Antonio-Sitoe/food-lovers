import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { Search, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

const orderFilterSchema = z.object({
  orderId: z.string().optional(),
  custumerName: z.string().optional(),
  status: z.string().optional()
})
type OrderFilterSchema = z.infer<typeof orderFilterSchema>

export function OrderTableFilters(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams()

  const orderId = searchParams.get('orderId')
  const custumerName = searchParams.get('custumerName')
  const status = searchParams.get('status')

  const { register, handleSubmit, control, reset } = useForm({
    resolver: zodResolver(orderFilterSchema),
    defaultValues: {
      orderId: orderId ?? '',
      custumerName: custumerName ?? '',
      status: status ?? 'all'
    }
  })

  function handleFilter({ custumerName, orderId, status }: OrderFilterSchema): void {
    setSearchParams((state) => {
      if (orderId) state.set('orderId', orderId)
      else state.delete('orderId')
      if (custumerName) state.set('custumerName', custumerName)
      else state.delete('custumerName')
      if (status) state.set('status', status)
      else state.delete('status')
      state.set('page', '1')
      return state
    })
  }

  function handleClear(): void {
    setSearchParams((state) => {
      state.delete('orderId')
      state.delete('custumerName')
      state.delete('status')
      state.set('page', '1')
      return state
    })

    reset({
      custumerName: '',
      orderId: '',
      status: 'all'
    })
  }
  return (
    <div>
      <form onSubmit={handleSubmit(handleFilter)} className="flex items-center gap-2">
        <Label className="text-sm font-semibold" htmlFor="filter">
          Filtros
        </Label>
        <Input
          placeholder="ID do pedido"
          className="h-8 w-auto"
          id="filter"
          {...register('orderId')}
        />
        <Input
          placeholder="Nome do cliente"
          className="h-8 w-80"
          id="filter"
          {...register('custumerName')}
        />

        <Controller
          name="status"
          control={control}
          render={({ field: { name, disabled, onChange, value } }) => {
            return (
              <Select
                defaultValue="all"
                name={name}
                value={value}
                onValueChange={onChange}
                disabled={disabled}
              >
                <SelectTrigger className="w-[180px] h-8">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos status</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="canceled">Cancelado</SelectItem>
                  <SelectItem value="processing">Em preparo</SelectItem>
                  <SelectItem value="delivering">Em Entrega</SelectItem>
                  <SelectItem value="delivered">Entregue</SelectItem>
                </SelectContent>
              </Select>
            )
          }}
        />

        <Button type="submit" variant="secondary">
          <Search className="h-3 w-3" />
          Filtrar resultados
        </Button>
        <Button type="submit" variant="outline" onClick={handleClear}>
          <X className="h-3 w-3" />
          Remover Filtrar
        </Button>
      </form>
    </div>
  )
}
