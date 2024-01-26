import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { Container, ProfileButton } from './todo-container.styled';
import { TodosTable } from '../todo-table/todo-table.component';
import { TodoHeader } from '../todo-header';
import { TodoSlider } from '../todo-slider';
import { TodoModal } from '../todo-modal';
import { useTodos } from '../../../../hooks/useTodos';
import { APP_KEYS } from '../../../consts';
import { TodoPhone } from '../todo-phone/todo-phone.component';

export const TodosContainer = () => {
  const { data, isLoading, isError } = useTodos();

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
    return <h1>Error happened...</h1>;
  }

  return (
    <Container>
      {isModalOpen && <TodoModal onClose={changeModalState} isCreateMode />}
      <Link to={APP_KEYS.ROUTER_KEYS.PROFILE}>
        <ProfileButton>My profile</ProfileButton>
      </Link>
      <ProfileButton onClick={() => changeModalState(true)}>Create todo</ProfileButton>
      <TodoHeader />
      {isDesktop && <TodosTable data={data} />}
      {isTablet && <TodoSlider />}
      {isMobile && <TodoPhone data={data} />}
    </Container>
  );
};
