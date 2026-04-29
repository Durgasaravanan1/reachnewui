import { useCampaignList } from '@/services/queries/campaigns.queries'
import { useAnalyticsOverview } from '@/services/queries/analytics.queries'
import { subDays, format } from 'date-fns'

export function useDashboard() {
  const dateFrom = format(subDays(new Date(), 30), 'yyyy-MM-dd')
  const dateTo   = format(new Date(), 'yyyy-MM-dd')

  const campaignsQuery = useCampaignList({ limit: 5 })
  const analyticsQuery = useAnalyticsOverview({ dateFrom, dateTo })

  return {
    campaigns:         campaignsQuery.data?.items ?? [],
    analytics:         analyticsQuery.data,
    isLoadingCampaigns: campaignsQuery.isLoading,
    isLoadingAnalytics: analyticsQuery.isLoading,
  }
}