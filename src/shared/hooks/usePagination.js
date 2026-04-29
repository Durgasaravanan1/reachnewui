import { useSearchParams } from 'react-router-dom'

export function usePagination({ defaultLimit = 20, paramPrefix = '' } = {}) {
  const [searchParams, setSearchParams] = useSearchParams()
  const pageKey = paramPrefix ? `${paramPrefix}_page` : 'page'
  const limitKey = paramPrefix ? `${paramPrefix}_limit` : 'limit'

  const page = Number(searchParams.get(pageKey)) || 1
  const limit = Number(searchParams.get(limitKey)) || defaultLimit

  const setPage = (newPage) => {
    setSearchParams((prev) => {
      prev.set(pageKey, String(newPage))
      return prev
    })
  }

  const setLimit = (newLimit) => {
    setSearchParams((prev) => {
      prev.set(limitKey, String(newLimit))
      prev.set(pageKey, '1')
      return prev
    })
  }

  return { page, limit, setPage, setLimit }
}