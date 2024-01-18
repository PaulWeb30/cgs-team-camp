import { ITodo } from '../common/types/todo.types';
import { HttpService } from './http.service';

export class UserService extends HttpService {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  getTodos() {
    return this.get({
      url: 'todos'
    });
  }

  getTodo(id: string) {
    return this.get({
      url: `todos/${id}`
    });
  }

  createTodo(todo: ITodo) {
    return this.post({
      url: 'todos/create',
      data: todo
    });
  }

  updateTodo(id: string, todo: ITodo) {
    return this.put({
      url: `todos/update/${id}`,
      data: todo
    });
  }

  deleteTodo(id: string) {
    return this.delete({
      url: `todo/${id}`
    });
  }
}
