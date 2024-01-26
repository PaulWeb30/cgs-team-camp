import { FindOperator } from 'typeorm';
import { Todo } from '../entities/Todo.entity';
import { User } from '../entities/User.entity';

export enum TodoStatus {
  COMPLETED = 'completed',
  ALL = 'all',
  PRIVATE = 'private',
  PUBLIC = 'public'
}

export interface ITodo {
  title: string;
  description: string;
  isPrivate: boolean;
  isCompleted: boolean;
  authorId: number;
}

export interface ITodoFilters {
  isCompleted?: boolean;
  isPrivate?: boolean;
  title?: FindOperator<string>;
  author?: User;
}

export interface IQueryFilters {
  page?: string;
  pageSize?: string;
  search?: string;
  status?: TodoStatus;
}

export interface TodoQueryResult {
  totalCount: number;
  page: number;
  pageSize: number;
  todos: Todo[];
  totalPages: number;
}
