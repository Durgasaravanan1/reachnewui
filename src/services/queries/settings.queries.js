import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { settingsApi } from '@/services/api/settings.api'

export const settingsKeys = {
  senders:  ['settings', 'senders'],
  team:     ['settings', 'team'],
  apiKeys:  ['settings', 'api-keys'],
  webhooks: ['settings', 'webhooks'],
  billing:  ['settings', 'billing'],
}

export function useSenderIdentities() {
  return useQuery({
    queryKey: settingsKeys.senders,
    queryFn:  () => settingsApi.getSenderIdentities(),
    staleTime: 5 * 60000,
  })
}

export function useTeamMembers() {
  return useQuery({
    queryKey: settingsKeys.team,
    queryFn:  () => settingsApi.getTeamMembers(),
    staleTime: 2 * 60000,
  })
}

export function useApiKeys() {
  return useQuery({
    queryKey: settingsKeys.apiKeys,
    queryFn:  () => settingsApi.getApiKeys(),
  })
}

export function useWebhooks() {
  return useQuery({
    queryKey: settingsKeys.webhooks,
    queryFn:  () => settingsApi.getWebhooks(),
  })
}

export function useBillingUsage() {
  return useQuery({
    queryKey: settingsKeys.billing,
    queryFn:  () => settingsApi.getBillingUsage(),
    staleTime: 10 * 60000,
  })
}

export function useInviteMember() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (dto) => settingsApi.inviteMember(dto),
    onSuccess:  () => qc.invalidateQueries({ queryKey: settingsKeys.team }),
  })
}

export function useUpdateMemberRole() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, role }) =>
      settingsApi.updateMemberRole(id, role),
    onSuccess: () => qc.invalidateQueries({ queryKey: settingsKeys.team }),
  })
}

export function useRemoveMember() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id) => settingsApi.removeMember(id),
    onSuccess:  () => qc.invalidateQueries({ queryKey: settingsKeys.team }),
  })
}

export function useCreateApiKey() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (dto) => settingsApi.createApiKey(dto),
    onSuccess:  () => qc.invalidateQueries({ queryKey: settingsKeys.apiKeys }),
  })
}

export function useDeactivateApiKey() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id) => settingsApi.deactivateApiKey(id),
    onSuccess:  () => qc.invalidateQueries({ queryKey: settingsKeys.apiKeys }),
  })
}

export function useVerifyDomain() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id) => settingsApi.verifyDomain(id),
    onSuccess:  () => qc.invalidateQueries({ queryKey: settingsKeys.senders }),
  })
}