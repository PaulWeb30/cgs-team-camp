import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { APP_KEYS } from '../common/consts';
import todoService from '../service/todo.service';

export const useTodos = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchFilter = searchParams.get('search');
  const statusFilter = searchParams.get('status') || 'all';
  const {
    data: todos,
    isLoading,
    isError,
    refetch
  } = useQuery(APP_KEYS.QUERY_KEYS.TODOS, () => todoService.getTodos(searchFilter, statusFilter), {
    keepPreviousData: false,
    refetchOnWindowFocus: false
  });

  return { todos, isLoading, isError, refetch, setSearchParams };
};
