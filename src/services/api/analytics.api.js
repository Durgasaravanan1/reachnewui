import { apiClient } from './client'

export const analyticsApi = {
  getOverview: (filters) =>
    apiClient.get('/analytics/overview', { params: filters }).then((r) => r.data),

  getTrend: (filters) =>
    apiClient.get('/analytics/trend', { params: filters }).then((r) => r.data),

  getCampaignBreakdown: (filters) =>
    apiClient
      .get('/analytics/campaigns', { params: filters })
      .then((r) => r.data),

  getAudienceEngagement: (filters) =>
    apiClient
      .get('/analytics/audience', { params: filters })
      .then((r) => r.data),
}