export enum TodoStatus {
  COMPLETED = 'completed',
  PENDING = 'pending'
}

export interface ITodo {
  title: string;
  description: string;
  isPrivate: boolean;
  status: TodoStatus;
  isCompleted: boolean;
}
