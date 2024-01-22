import { useQuery } from 'react-query';
import { APP_KEYS } from '../common/consts';
import todoService from '../service/todo.service';

export const useTodos = () => {
  const {
    data: todos,
    isLoading,
    isError
  } = useQuery(APP_KEYS.QUERY_KEYS.TODOS, () => todoService.getTodos(), {
    keepPreviousData: false,
    refetchOnWindowFocus: false
  });

  return { todos, isLoading, isError };
};
