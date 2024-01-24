export enum TodoStatus {
  COMPLETED = 'completed',
  PENDING = 'pending'
}
type TodoAuthor = {
  id: number;
};

export interface ITodo {
  id: number;
  title: string;
  description: string;
  isPrivate: boolean;
  status: TodoStatus;
  isCompleted: boolean;
  author?: TodoAuthor;
}
