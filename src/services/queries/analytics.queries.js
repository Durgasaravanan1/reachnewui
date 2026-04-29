import { useQuery } from '@tanstack/react-query'
import { analyticsApi } from '@/services/api/analytics.api'

export const analyticsKeys = {
  overview:  (f) => ['analytics', 'overview', f],
  trend:     (f) => ['analytics', 'trend', f],
  campaigns: (f) => ['analytics', 'campaigns', f],
  audience:  (f) => ['analytics', 'audience', f],
}

export function useAnalyticsOverview(filters) {
  return useQuery({
    queryKey: analyticsKeys.overview(filters),
    queryFn:  () => analyticsApi.getOverview(filters),
    staleTime: 5 * 60000,
    enabled:  !!(filters.dateFrom && filters.dateTo),
  })
}

export function useAnalyticsTrend(filters) {
  return useQuery({
    queryKey: analyticsKeys.trend(filters),
    queryFn:  () => analyticsApi.getTrend(filters),
    staleTime: 5 * 60000,
    enabled:  !!(filters.dateFrom && filters.dateTo),
  })
}

export function useCampaignPerformanceBreakdown(filters) {
  return useQuery({
    queryKey: analyticsKeys.campaigns(filters),
    queryFn:  () => analyticsApi.getCampaignBreakdown(filters),
    staleTime: 5 * 60000,
    enabled:  !!(filters.dateFrom && filters.dateTo),
  })
}

export function useAudienceEngagement(filters) {
  return useQuery({
    queryKey: analyticsKeys.audience(filters),
    queryFn:  () => analyticsApi.getAudienceEngagement(filters),
    staleTime: 10 * 60000,
  })
}