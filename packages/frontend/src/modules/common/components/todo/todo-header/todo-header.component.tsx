import React from 'react';
import { HeaderContainer } from './todo-header.styled';
import { TodoSearch } from '../todo-search';
import { TodoFilters } from '../todo-filters';

export const TodoHeader = () => (
  <HeaderContainer>
    <TodoFilters />
    <TodoSearch />
  </HeaderContainer>
);
