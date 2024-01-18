export enum TodoStatus {
  COMPLETED = 'completed',
  PENDING = 'pending'
}

export interface ITodo {
  id: number;
  title: string;
  description: string;
  isPrivate: boolean;
  status: TodoStatus;
}
