import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { templatesApi } from '@/services/api/templates.api'

export const templateKeys = {
  all:    ['templates'],
  lists:  (f) => ['templates', 'list', f],
  detail: (id) => ['templates', 'detail', id],
}

export function useTemplateList(filters = {}) {
  return useQuery({
    queryKey: templateKeys.lists(filters),
    queryFn:  () => templatesApi.getAll(filters),
    staleTime: 60000,
  })
}

export function useTemplateDetail(id) {
  return useQuery({
    queryKey: templateKeys.detail(id),
    queryFn:  () => templatesApi.getById(id),
    enabled:  !!id,
  })
}

export function useCreateTemplate() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (dto) => templatesApi.create(dto),
    onSuccess:  () => qc.invalidateQueries({ queryKey: templateKeys.all }),
  })
}

export function useUpdateTemplate() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, dto }) =>
      templatesApi.update(id, dto),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: templateKeys.detail(id) })
      qc.invalidateQueries({ queryKey: templateKeys.all })
    },
  })
}

export function useDuplicateTemplate() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id) => templatesApi.duplicate(id),
    onSuccess:  () => qc.invalidateQueries({ queryKey: templateKeys.all }),
  })
}

export function useDeleteTemplate() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id) => templatesApi.delete(id),
    onSuccess:  () => qc.invalidateQueries({ queryKey: templateKeys.all }),
  })
}

export function useSubmitForMetaApproval() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id) => templatesApi.submitForMetaApproval(id),
    onSuccess: (_, id) => qc.invalidateQueries({ queryKey: templateKeys.detail(id) }),
  })
}