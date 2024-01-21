import React from 'react';
import { FilterButton, FilterButtonContainer } from './todo-filters.styled';

export const TodoFilters = () => {
  const [activeFilter, setActiveFilter] = React.useState<string>('all');
  return (
    <FilterButtonContainer>
      <FilterButton active={activeFilter === 'all'} onClick={() => setActiveFilter('all')}>
        All
      </FilterButton>
      <FilterButton active={activeFilter === 'private'} onClick={() => setActiveFilter('private')}>
        Private
      </FilterButton>
      <FilterButton active={activeFilter === 'public'} onClick={() => setActiveFilter('public')}>
        Public
      </FilterButton>
      <FilterButton
        active={activeFilter === 'completed'}
        onClick={() => setActiveFilter('completed')}
      >
        Completed
      </FilterButton>
    </FilterButtonContainer>
  );
};
