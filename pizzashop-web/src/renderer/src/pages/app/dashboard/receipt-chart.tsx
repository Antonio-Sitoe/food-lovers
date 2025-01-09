import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip, TooltipProps } from 'recharts'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { ChartConfig, ChartContainer } from '@/components/ui/chart'
import { getDailyReceiptInPeriod } from '@/api/get-daily-receipt-in-period'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { useQuery } from '@tanstack/react-query'
import { Label } from '@/components/ui/label'
import { DateRange } from 'react-day-picker'
import React, { useMemo } from 'react'
import { subDays } from 'date-fns'
import { Loader2 } from 'lucide-react'

const chartConfig = {
  receipt: {
    label: 'Receita',
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig

function CustomTooltip({
  active,
  payload,
  label
}: TooltipProps<number, number>): JSX.Element | null {
  if (active && payload && payload.length) {
    return (
      <div className="flex gap-1 rounded-l border bg-card p-2 text-sm text-card-foreground shadow-sm">
        <span className="font-semibold">{label}</span>
        <span>-</span>
        <span>
          {payload[0].value?.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          })}
        </span>
      </div>
    )
  }

  return null
}

export function ReceiptChart(): JSX.Element {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date()
  })

  const { data: dayleRevenue } = useQuery({
    queryKey: ['getDailyReceiptInPeriod'],
    queryFn: () => getDailyReceiptInPeriod({ from: date?.from, to: date?.to })
  })

  const chartData = useMemo(
    () => dayleRevenue?.map((item) => ({ date: item.date, receipt: item.receipt / 100 })) || [],
    [dayleRevenue]
  )

  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">Receita no Periodo</CardTitle>
          <CardDescription>Receita diaria no periodo</CardDescription>
        </div>
        <div className="flex items-center gap-3">
          <Label>Periodo</Label>
          <DateRangePicker date={date} onDateChange={setDate} />
        </div>
      </CardHeader>
      <CardContent>
        {dayleRevenue ? (
          <ChartContainer config={chartConfig} className="h-[260px] w-full">
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
                bottom: 12
              }}
              className="text-sm"
            >
              <CartesianGrid vertical={false} className="stroke-muted" />
              <XAxis dataKey="date" stroke="#888888" tickLine={false} axisLine={false} dy={16} />
              <YAxis
                tickLine={false}
                stroke="#888"
                axisLine={false}
                width={80}
                tickFormatter={(value: number) =>
                  value.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'MZN'
                  })
                }
              />
              <Tooltip cursor={false} content={<CustomTooltip />} />
              <Line dataKey="receipt" type="linear" strokeWidth={2} dot={false} />
            </LineChart>
          </ChartContainer>
        ) : (
          <div className="flex h-[240px] w-full items-center justify-center">
            <Loader2 className="text-muted-foreground animate-spin h-8 w-8" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
