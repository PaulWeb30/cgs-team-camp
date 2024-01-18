import React from 'react';
import { useQuery } from 'react-query';
import { Container } from './todos.styled';
import todoService from '../service/todo.service';
import { APP_KEYS } from '../common/consts';

const TodosPageContainer = () => {
  const {
    data: todos,
    isLoading,
    isError
  } = useQuery(APP_KEYS.QUERY_KEYS.TODOS, () => todoService.getTodos(), {
    keepPreviousData: true,
    refetchOnWindowFocus: false
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Error...</h1>;
  }
  return (
    <>
      <Container>
        {todos?.map((todo) => (
          <h1 key={todo.id}>{todo.title}</h1>
        ))}
      </Container>
      ;
    </>
  );
};

export default TodosPageContainer;
