import { useSearchParams } from 'react-router-dom';
// import { useCampaignList } from '@/services/queries/campaigns.queries';
import { useCampaignList } from '../../services/queries/campaigns.queries';
export function useCampaigns() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = {
    status: searchParams.get('status') ?? undefined,
    channel: searchParams.get('channel') ?? undefined,
    search: searchParams.get('q') ?? undefined,
    page: Number(searchParams.get('page')) || 1,
    limit: 20,
  };

  const query = useCampaignList(filters);

  const setFilter = (key, value) => {
    setSearchParams((prev) => {
      if (value) prev.set(key, value);
      else prev.delete(key);
      if (key !== 'page') prev.delete('page');
      return prev;
    });
  };

  return {
    campaigns: query.data?.items ?? [],
    total: query.data?.total ?? 0,
    totalPages: query.data?.totalPages ?? 0,
    isLoading: query.isLoading,
    error: query.error,
    filters,
    setFilter,
  };
}