import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { automationApi } from '@/services/api/automation.api'

export const workflowKeys = {
  all:    ['workflows'],
  detail: (id) => ['workflows', 'detail', id],
  logs:   (id, p) => ['workflows', 'logs', id, p],
}

export function useWorkflowList() {
  return useQuery({
    queryKey: workflowKeys.all,
    queryFn:  () => automationApi.getAll(),
    staleTime: 30000,
  })
}

export function useWorkflowDetail(id) {
  return useQuery({
    queryKey: workflowKeys.detail(id),
    queryFn:  () => automationApi.getById(id),
    enabled:  !!id,
  })
}

export function useWorkflowLogs(id, params = {}) {
  return useQuery({
    queryKey: workflowKeys.logs(id, params),
    queryFn:  () => automationApi.getActivityLog(id, params),
    enabled:  !!id,
  })
}

export function useCreateWorkflow() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (dto) => automationApi.create(dto),
    onSuccess:  () => qc.invalidateQueries({ queryKey: workflowKeys.all }),
  })
}

export function useActivateWorkflow() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id) => automationApi.activate(id),
    onSuccess:  () => qc.invalidateQueries({ queryKey: workflowKeys.all }),
  })
}

export function usePauseWorkflow() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id) => automationApi.pause(id),
    onSuccess:  () => qc.invalidateQueries({ queryKey: workflowKeys.all }),
  })
}

export function useDeleteWorkflow() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id) => automationApi.delete(id),
    onSuccess:  () => qc.invalidateQueries({ queryKey: workflowKeys.all }),
  })
}