import { Todo } from '../entities/Todo.entity';
import { IQueryFilters, TodoStatus, TodoQueryResult } from '../types/todos.type';

export const generateDbQuery = async (
  userId: string,
  query: IQueryFilters
): Promise<TodoQueryResult> => {
  const { page, pageSize } = query;

  const pageNumeric = Number(page);
  const pageSizeNumeric = Number(pageSize);

  const qb = Todo.createQueryBuilder('todo');

  const statusHandlers = {
    [TodoStatus.ALL]: () => {},
    [TodoStatus.COMPLETED]: () => {
      qb.andWhere('todo.isCompleted = :isCompleted', { isCompleted: true });
    },
    [TodoStatus.PRIVATE]: () => {
      qb.andWhere('todo.isPrivate = :isPrivate', { isPrivate: true });
    },
    [TodoStatus.PUBLIC]: () => {
      qb.andWhere('todo.isPrivate = :isPrivate', { isPrivate: false });
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

  const skip = (pageNumeric - 1) * pageSizeNumeric;

  qb.skip(skip).take(pageSizeNumeric);

  const totalCount = await qb.getCount();
  const totalPages = Math.ceil(totalCount / pageSizeNumeric);

  const todos = await qb.getMany();

  return { totalCount, page: pageNumeric, pageSize: pageSizeNumeric, todos, totalPages };
};
