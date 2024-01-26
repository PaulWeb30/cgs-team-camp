type TodoAuthor = {
  id: number;
};

export interface ITodo {
  id: number;
  title: string;
  description: string;
  isPrivate: boolean;
  isCompleted: boolean;
  author?: TodoAuthor;
}

export interface IGetTodos {
  todos: ITodo[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ITodoFilters {
  search: string;
  status: string;
  page: string;
}
