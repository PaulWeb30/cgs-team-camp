import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { Container, ProfileButton } from './todo-container.styled';
import { TodosTable } from '../todo-table/todo-table.component';
import { TodoHeader } from '../todo-header';
import { TodoCard } from '../todo-card';
import { TodoSlider } from '../todo-slider';
import { TodoModal } from '../todo-modal';
import { useTodos } from '../../../../hooks/useTodos';
import { APP_KEYS } from '../../../consts';

export const TodosContainer = () => {
  const { todos, isLoading, isError } = useTodos();

  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const changeModalState = (state: boolean) => setModalOpen(state);

  const isDesktop = useMediaQuery({
    query: '(min-width: 1024px)'
  });
  const isTablet = useMediaQuery({ query: '(min-width: 680px) and (max-width: 1023px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 679px)' });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Error...</h1>;
  }

  return (
    <Container>
      {isModalOpen && <TodoModal onClose={changeModalState} isCreateMode />}
      <Link to={APP_KEYS.ROUTER_KEYS.PROFILE}>
        <ProfileButton>My profile</ProfileButton>
      </Link>
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
          <TodoHeader />
          {todos?.map((todo) => (
            <TodoCard key={todo.id} todo={todo} />
          ))}
        </>
      )}
    </Container>
  );
};
