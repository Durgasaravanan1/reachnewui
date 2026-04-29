import { useParams } from 'react-router-dom';
import {
  useCampaignDetail,
  useCampaignAnalytics,
  useCampaignLinks,
  useCampaignRecipients,
} from '@/services/queries/campaigns.queries';

export function useCampaignDetailData() {
  const { id = '' } = useParams();

  const campaignQuery = useCampaignDetail(id);
  const analyticsQuery = useCampaignAnalytics(id);
  const linksQuery = useCampaignLinks(id);
  const recipientsQuery = useCampaignRecipients(id, { page: 1, limit: 10 });

  return {
    id,
    campaign: campaignQuery.data,
    analytics: analyticsQuery.data,
    links: linksQuery.data ?? [],
    recipients: recipientsQuery.data?.items ?? [],
    isLoading: campaignQuery.isLoading,
    error: campaignQuery.error,
  };
}