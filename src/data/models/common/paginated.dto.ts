export default interface PaginatedDTO<T> {
  page: number
  count: number
  hasNext: boolean
  data: T[]
}