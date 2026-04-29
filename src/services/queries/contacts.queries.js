import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query'
import { contactsApi } from '@/services/api/contacts.api'

export const contactKeys = {
  all:    ['contacts'],
  lists:  (f) => ['contacts', 'list', f],
  detail: (id) => ['contacts', 'detail', id],
  import: (jobId) => ['contacts', 'import', jobId],
}

export function useContactList(filters = {}) {
  return useQuery({
    queryKey: contactKeys.lists(filters),
    queryFn:  () => contactsApi.getAll(filters),
    placeholderData: keepPreviousData,
    staleTime: 30000,
  })
}

export function useContactDetail(id) {
  return useQuery({
    queryKey: contactKeys.detail(id),
    queryFn:  () => contactsApi.getById(id),
    enabled:  !!id,
  })
}

export function useImportJobStatus(jobId) {
  return useQuery({
    queryKey: contactKeys.import(jobId ?? ''),
    queryFn:  () => contactsApi.getImportJobStatus(jobId),
    enabled:  !!jobId,
    refetchInterval: (q) =>
      q.state.data?.status === 'processing' ? 2000 : false,
  })
}

export function useCreateContact() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (dto) => contactsApi.create(dto),
    onSuccess: () => qc.invalidateQueries({ queryKey: contactKeys.all }),
  })
}

export function useUpdateContact() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, dto }) =>
      contactsApi.update(id, dto),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: contactKeys.detail(id) })
      qc.invalidateQueries({ queryKey: contactKeys.all })
    },
  })
}

export function useDeleteContact() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id) => contactsApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: contactKeys.all }),
  })
}

export function useImportContacts() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ file, config }) =>
      contactsApi.importCsv(file, config),
    onSuccess: () => qc.invalidateQueries({ queryKey: contactKeys.all }),
  })
}