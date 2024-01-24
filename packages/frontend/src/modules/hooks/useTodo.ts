import { useQuery } from 'react-query';
import { APP_KEYS } from '../common/consts';
import todoService from '../service/todo.service';

export const useTodo = (id: string) => {
  const {
    data: todo,
    isLoading,
    isError
  } = useQuery([APP_KEYS.QUERY_KEYS.TODO, id], () => todoService.getTodo(id), {
    keepPreviousData: false,
    refetchOnWindowFocus: false
  });

  return {
    todo,
    isLoading,
    isError
  };
};
