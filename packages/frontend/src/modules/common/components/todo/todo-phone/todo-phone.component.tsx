import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSearchParams } from 'react-router-dom';
import { useGetTodosInfiniteQuery } from '../../../../hooks/useInfinityTodo';
import { Loader } from '../loader';
import { TodoCard } from '../todo-card';

export const TodoPhone = () => {
  const [searchParams] = useSearchParams();
  const searchFilter = searchParams.get('search') || '';
  const statusFilter = searchParams.get('status') || 'all';
  const pageFilter = searchParams.get('page') || '1';

  const { ref, inView } = useInView({
    threshold: 0
  });
  const { data, hasNextPage, fetchNextPage, isLoading } = useGetTodosInfiniteQuery({
    page: pageFilter,
    status: statusFilter,
    search: searchFilter
  });

  useEffect(() => {
    const fetchData = async () => {
      if (inView && hasNextPage) {
        await fetchNextPage();
      }
    };

    fetchData();
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return <Loader />;
  }

  const todosDynamic = data?.pages.map((page) => page.todos).flat() || [];

  return (
    <div>
      {todosDynamic?.length ? (
        <>
          <div>
            {todosDynamic?.map((todo) => (
              <TodoCard key={todo.id} todo={todo} />
            ))}
          </div>
          <div ref={ref} />
        </>
      ) : (
        <h3>No todos found</h3>
      )}
    </div>
  );
};
