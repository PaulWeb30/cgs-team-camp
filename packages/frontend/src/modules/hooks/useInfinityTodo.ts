import { useInfiniteQuery } from 'react-query';
import { APP_KEYS } from '../common/consts';
import { IGetTodos, ITodoFilters } from '../common/types/todo.types';
import todoService from '../service/todo.service';

export const useGetTodosInfiniteQuery = (params: ITodoFilters) =>
  useInfiniteQuery<IGetTodos>({
    queryKey: [APP_KEYS.QUERY_KEYS.TODOS, params],
    queryFn: ({ pageParam = 1 }) => todoService.getTodos({ ...params, page: pageParam }),
    getNextPageParam: ({ page, totalPages }) => {
      const nextPage = page + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    }
  });
