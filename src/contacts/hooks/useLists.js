import { useListAll } from '@/services/queries/lists.queries';
import { useCreateList, useDeleteList } from '@/services/queries/lists.queries';
import { useToast } from '@/store/ui.store';

export function useLists() {
  const { data: lists = [], isLoading } = useListAll();
  const addToast = useToast();

  const createListMutation = useCreateList();
  const deleteListMutation = useDeleteList();

  const createList = async (name, description) => {
    createListMutation.mutate(
      { listName: name, description },
      {
        onSuccess: () => addToast({ type: 'success', title: 'List created', description: `"${name}" is ready.` }),
        onError: () => addToast({ type: 'error', title: 'Failed to create list' }),
      }
    );
  };

  const deleteList = async (id, name) => {
    deleteListMutation.mutate(id, {
      onSuccess: () => addToast({ type: 'success', title: 'List deleted' }),
      onError: () => addToast({ type: 'error', title: 'Failed to delete list' }),
    });
  };

  return { lists, isLoading, createList, deleteList, isCreating: createListMutation.isPending };
}