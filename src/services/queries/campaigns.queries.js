import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query'
// import { campaignsApi } from '@/services/api/campaigns.api'
import { campaignsApi } from '../api/campaigns.api'
// ── Query Key Factory ─────────────────────────────────────────────────────────
export const campaignKeys = {
  all:       ['campaigns'],
  lists:     (filters) => ['campaigns', 'list', filters],
  detail:    (id) => ['campaigns', 'detail', id],
  analytics: (id) => ['campaigns', 'analytics', id],
  recipients: (id, p) => ['campaigns', 'recipients', id, p],
  links:     (id) => ['campaigns', 'links', id],
  calendar:  (range) => ['campaigns', 'calendar', range],
}

// ── Queries ───────────────────────────────────────────────────────────────────
export function useCampaignList(filters = {}) {
  return useQuery({
    queryKey: campaignKeys.lists(filters),
    queryFn:  () => campaignsApi.getAll(filters),
    placeholderData: keepPreviousData,
    staleTime: 30000,
  })
}

export function useCampaignDetail(id) {
  return useQuery({
    queryKey: campaignKeys.detail(id),
    queryFn:  () => campaignsApi.getById(id),
    enabled:  !!id,
  })
}

export function useCampaignAnalytics(id) {
  return useQuery({
    queryKey: campaignKeys.analytics(id),
    queryFn:  () => campaignsApi.getAnalytics(id),
    enabled:  !!id,
    staleTime: 60000,
  })
}

export function useCampaignRecipients(id, params) {
  return useQuery({
    queryKey: campaignKeys.recipients(id, params),
    queryFn:  () => campaignsApi.getRecipients(id, params),
    enabled:  !!id,
    placeholderData: keepPreviousData,
  })
}

export function useCampaignLinks(id) {
  return useQuery({
    queryKey: campaignKeys.links(id),
    queryFn:  () => campaignsApi.getLinkClicks(id),
    enabled:  !!id,
  })
}

export function useCampaignCalendar(from, to) {
  return useQuery({
    queryKey: campaignKeys.calendar({ from, to }),
    queryFn:  () => campaignsApi.getCalendar({ from, to }),
    staleTime: 60000,
  })
}

// ── Mutations ─────────────────────────────────────────────────────────────────
export function useCreateCampaign() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (dto) => campaignsApi.create(dto),
    onSuccess:  () => qc.invalidateQueries({ queryKey: campaignKeys.all }),
  })
}

export function useScheduleCampaign() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id) => campaignsApi.schedule(id),
    onSuccess: (_, id) => {
      qc.invalidateQueries({ queryKey: campaignKeys.detail(id) })
      qc.invalidateQueries({ queryKey: campaignKeys.all })
    },
  })
}

export function usePauseCampaign() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id) => campaignsApi.pause(id),
    onSuccess: (_, id) => {
      qc.invalidateQueries({ queryKey: campaignKeys.detail(id) })
      qc.invalidateQueries({ queryKey: campaignKeys.all })
    },
  })
}

export function useCancelCampaign() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id) => campaignsApi.cancel(id),
    onSuccess: (_, id) => {
      qc.invalidateQueries({ queryKey: campaignKeys.detail(id) })
      qc.invalidateQueries({ queryKey: campaignKeys.all })
    },
  })
}

export function useDuplicateCampaign() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id) => campaignsApi.duplicate(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: campaignKeys.all }),
  })
}

export function useDeleteCampaign() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id) => campaignsApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: campaignKeys.all }),
  })
}

export function useSendTestEmail() {
  return useMutation({
    mutationFn: ({ id, email }) =>
      campaignsApi.sendTest(id, email),
  })
}

export function useApproveCampaign() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id) => campaignsApi.approve(id),
    onSuccess: (_, id) => qc.invalidateQueries({ queryKey: campaignKeys.detail(id) }),
  })
}