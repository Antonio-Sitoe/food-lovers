import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { Button } from './button'

interface PaginationPros {
  totalCount: number
  perPage: number
  pageIndex: number
  onPageChange(index: number): Promise<void> | void
}
export function Pagination({
  totalCount,
  perPage,
  pageIndex,
  onPageChange
}: PaginationPros): JSX.Element {
  const pages = Math.ceil(totalCount / perPage) || 1
  return (
    <div className="flex items-center justify-between">
      <span>Total de {totalCount} items(s)</span>
      <div className="flex items-center gap-2">
        <div className="text-sm font-medium">
          Pagina {pageIndex + 1} de {pages}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => onPageChange(0)} disabled={pageIndex === 0}>
            <ChevronsLeft className="w-4 h-4" />
            <span className="sr-only">Primeira pagina</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => onPageChange(pageIndex - 1)}
            disabled={pageIndex === 0}
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="sr-only">pagina anterior</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => onPageChange(pageIndex + 1)}
            disabled={pages <= pageIndex + 1}
          >
            <ChevronRight className="w-4 h-4" />
            <span className="sr-only">Proxima pagina</span>
          </Button>
          <Button
            variant="outline"
            onClick={() => onPageChange(totalCount - 1)}
            disabled={pages <= pageIndex + 1}
          >
            <ChevronsRight className="w-4 h-4" />
            <span className="sr-only">Ultima pagina</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
