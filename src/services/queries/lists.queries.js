import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { listsApi } from '@/services/api/lists.api'

export const listKeys = {
  all:         ['lists'],
  detail:      (id) => ['lists', 'detail', id],
  contacts:    (id, p) => ['lists', 'contacts', id, p],
  suppression: (f) => ['suppression', f],
}

export function useListAll() {
  return useQuery({
    queryKey: listKeys.all,
    queryFn:  () => listsApi.getAll(),
    staleTime: 60000,
  })
}

export function useListDetail(id) {
  return useQuery({
    queryKey: listKeys.detail(id),
    queryFn:  () => listsApi.getById(id),
    enabled:  !!id,
  })
}

export function useListContacts(listId, params = {}) {
  return useQuery({
    queryKey: listKeys.contacts(listId, params),
    queryFn:  () => listsApi.getContacts(listId, params),
    enabled:  !!listId,
  })
}

export function useSuppressionList(filters = {}) {
  return useQuery({
    queryKey: listKeys.suppression(filters),
    queryFn:  () => listsApi.getSuppressed(filters),
  })
}

export function useCreateList() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (dto) => listsApi.create(dto),
    onSuccess:  () => qc.invalidateQueries({ queryKey: listKeys.all }),
  })
}

export function useUpdateList() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, dto }) =>
      listsApi.update(id, dto),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: listKeys.detail(id) })
      qc.invalidateQueries({ queryKey: listKeys.all })
    },
  })
}

export function useDeleteList() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id) => listsApi.delete(id),
    onSuccess:  () => qc.invalidateQueries({ queryKey: listKeys.all }),
  })
}

export function useAddSuppression() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: listsApi.addSuppression,
    onSuccess:  () => qc.invalidateQueries({ queryKey: ['suppression'] }),
  })
}

export function useRemoveSuppression() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, note }) =>
      listsApi.removeSuppression(id, note),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['suppression'] }),
  })
}