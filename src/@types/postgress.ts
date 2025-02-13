export interface PostgresError extends Error {
  code?: string // Código do erro (e.g., '23505')
  detail?: string // Detalhes adicionais do erro
  constraint?: string // Nome da constraint violada (opcional)
}
