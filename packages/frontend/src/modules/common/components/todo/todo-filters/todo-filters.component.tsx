import React from 'react';
import { FilterButton, FilterButtonContainer } from './todo-filters.styled';

export const TodoFilters = () => {
  const [activeFilter, setActiveFilter] = React.useState<string>('All');

  const FILTERS: string[] = ['All', 'Private', 'Public', 'Completed'];
  return (
    <FilterButtonContainer>
      {FILTERS.map((filter) => (
        <FilterButton
          key={filter}
          active={activeFilter === filter}
          onClick={() => setActiveFilter(filter)}
        >
          {filter}
        </FilterButton>
      ))}
    </FilterButtonContainer>
  );
};
