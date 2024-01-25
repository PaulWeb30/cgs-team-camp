import { Like } from 'typeorm';
import { User } from '../entities/User.entity';
import { IQueryFilters, ITodoFilters, TodoStatus } from '../types/todos.type';

export const generateDbQuery = (userId: string, query: IQueryFilters): ITodoFilters => {
  let dbQuery: ITodoFilters = {};

  switch (query.status) {
    case TodoStatus.COMPLETED:
      dbQuery = {};
      dbQuery.author = { id: userId } as User;
      dbQuery.isCompleted = true;
      break;
    case TodoStatus.PRIVATE:
      dbQuery = {};
      dbQuery.author = { id: userId } as User;
      dbQuery.isPrivate = true;
      break;
    case TodoStatus.PUBLIC:
      dbQuery = {};
      dbQuery.author = { id: userId } as User;
      dbQuery.isPrivate = false;
      break;
    case TodoStatus.ALL:
      dbQuery = {};
      break;
    default:
      break;
  }

  if (query.search) {
    dbQuery.title = Like(`%${query.search}%`);
  }

  return dbQuery;
};
