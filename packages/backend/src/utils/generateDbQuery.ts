import { Todo } from '../entities/Todo.entity';
import { IQueryFilters, TodoStatus } from '../types/todos.type';

export const generateDbQuery = async (userId: string, query: IQueryFilters): Promise<Todo[]> => {
  const qb = Todo.createQueryBuilder('todo');

  const statusHandlers = {
    [TodoStatus.ALL]: () => {},
    [TodoStatus.COMPLETED]: () => {
      qb.andWhere('todo.isCompleted = :isCompleted', { isCompleted: true });
      qb.andWhere('todo.author = :userId', { userId });
    },
    [TodoStatus.PRIVATE]: () => {
      qb.andWhere('todo.isPrivate = :isPrivate', { isPrivate: true });
      qb.andWhere('todo.author = :userId', { userId });
    },
    [TodoStatus.PUBLIC]: () => {
      qb.andWhere('todo.isPrivate = :isPrivate', { isPrivate: false });
      qb.andWhere('todo.author = :userId', { userId });
    }
  };

  if (query.status !== TodoStatus.ALL) {
    qb.andWhere('todo.author = :userId', { userId });
  }

  const statusHandler = query?.status
    ? statusHandlers[query.status]
    : statusHandlers[TodoStatus.ALL];
  statusHandler();

  if (query.search) {
    qb.andWhere('todo.title LIKE :search', { search: `%${query.search}%` }).orWhere(
      'todo.description LIKE :search',
      { search: `%${query.search}%` }
    );
  }

  qb.orderBy('todo.id', 'ASC');

  return qb.getMany();
};
