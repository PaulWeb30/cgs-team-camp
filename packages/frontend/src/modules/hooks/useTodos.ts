import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { APP_KEYS } from '../common/consts';
import todoService from '../service/todo.service';

export const useTodos = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchFilter = searchParams.get('search') || '';
  const statusFilter = searchParams.get('status') || 'all';
  const page = searchParams.get('page') || '1';

  const { data, isLoading, isError, refetch } = useQuery(
    [APP_KEYS.QUERY_KEYS.TODOS],
    () => todoService.getTodos({ search: searchFilter, status: statusFilter, page }),
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false
    }
  );

  return {
    data,
    isLoading,
    isError,
    refetch,
    setSearchParams,
    page
  };
};
