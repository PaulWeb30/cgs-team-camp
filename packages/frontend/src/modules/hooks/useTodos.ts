import { useQuery } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { APP_KEYS } from '../common/consts';
import todoService from '../service/todo.service';

export const useTodos = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchFilter = searchParams.get('search') || '';
  const statusFilter = searchParams.get('status') || 'all';
  const page = searchParams.get('page') || '1';

  const { data, isLoading, isError, refetch } = useQuery(
    [APP_KEYS.QUERY_KEYS.TODOS],
    () => todoService.getTodos({ search: searchFilter, status: statusFilter, page }),
    {
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      retry: 3,
      onError: async (error: any) => {
        if (error?.request?.status === 401) {
          localStorage.removeItem(APP_KEYS.STORAGE_KEYS.TOKEN);
          navigate(APP_KEYS.ROUTER_KEYS.AUTH);
        }
      }
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
