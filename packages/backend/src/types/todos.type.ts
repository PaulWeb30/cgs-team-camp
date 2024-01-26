import { FindOperator } from 'typeorm';
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
  search?: string;
  status?: TodoStatus;
}
