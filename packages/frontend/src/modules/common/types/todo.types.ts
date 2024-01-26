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
