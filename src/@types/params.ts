export interface GetParams {
  limit?: number
  offset?: number
  search?: string
}

export interface GetNextApiResponseParams {
  params: Promise<{
    id: string
  }>
}
