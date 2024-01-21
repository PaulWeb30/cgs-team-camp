import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useMediaQuery } from 'react-responsive';
import { Container, ProfileButton } from './todo-container.styled';
import todoService from '../../../../service/todo.service';
import { APP_KEYS } from '../../../consts';
import { TodosTable } from '../todo-table/todo-table.component';
import { TodoHeader } from '../todo-header';
import { TodoSearch } from '../todo-search';
import { TodoFilters } from '../todo-filters';
import { TodoCard } from '../todo-card';
import { TodoSlider } from '../todo-slider';
import { TodoModal } from '../todo-modal';

export const TodosContainer = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const changeModalState = (state: boolean) => setModalOpen(state);

  const isDesktop = useMediaQuery({
    query: '(min-width: 1024px)'
  });
  const isTablet = useMediaQuery({ query: '(min-width: 680px) and (max-width: 1023px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 679px)' });

  const {
    data: todos,
    isLoading,
    isError
  } = useQuery(APP_KEYS.QUERY_KEYS.TODOS, () => todoService.getTodos(), {
    keepPreviousData: false,
    refetchOnWindowFocus: false
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Error...</h1>;
  }

  return (
    <Container>
      {isModalOpen && <TodoModal onClose={changeModalState} isCreateMode />}
      <ProfileButton>My profile</ProfileButton>
      <ProfileButton onClick={() => changeModalState(true)}>Create todo</ProfileButton>
      {isDesktop && (
        <>
          <TodoHeader />
          <TodosTable todos={todos} />
        </>
      )}
      {isTablet && (
        <>
          <TodoHeader />
          <TodoSlider todos={todos} />
        </>
      )}
      {isMobile && (
        <>
          <TodoSearch />
          <TodoFilters />
          {todos?.map((todo) => (
            <TodoCard key={todo.id} todo={todo} />
          ))}
        </>
      )}
    </Container>
  );
};
