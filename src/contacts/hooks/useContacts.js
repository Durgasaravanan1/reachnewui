import { useSearchParams } from 'react-router-dom';
import { useContactList } from '@/services/queries/contacts.queries';

export function useContacts() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = {
    search: searchParams.get('q') ?? undefined,
    listId: searchParams.get('list') ?? undefined,
    globalStatus: searchParams.get('status') ?? undefined,
    page: Number(searchParams.get('page')) || 1,
    limit: 20,
  };

  const query = useContactList(filters);

  const setFilter = (key, value) => {
    setSearchParams((prev) => {
      if (value) prev.set(key, value);
      else prev.delete(key);
      if (key !== 'page') prev.delete('page');
      return prev;
    });
  };

  return {
    contacts: query.data?.items ?? [],
    total: query.data?.total ?? 0,
    totalPages: query.data?.totalPages ?? 0,
    isLoading: query.isLoading,
    filters,
    setFilter,
  };
}