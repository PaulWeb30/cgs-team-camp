import { ITodo } from '../common/types/todo.types';
import { HttpService } from './http.service';
import { APP_KEYS } from '../common/consts';

class TodoService extends HttpService {
  constructor() {
    super();
  }

  getTodos(): Promise<ITodo[]> {
    return this.get(
      {
        url: APP_KEYS.BACKEND_KEYS.ROOT
      },
      false
    );
  }

  getTodo(id: string): Promise<ITodo> {
    return this.get({
      url: APP_KEYS.BACKEND_KEYS.TODO(id)
    });
  }

  createTodo(todo: { title: string; description: string }): Promise<ITodo> {
    return this.post({
      url: APP_KEYS.BACKEND_KEYS.CREATE,
      data: todo
    });
  }

  updateTodo(id: string, todo: ITodo): Promise<ITodo> {
    return this.put({
      url: APP_KEYS.BACKEND_KEYS.UPDATE(id),
      data: todo
    });
  }

  deleteTodo(id: string): Promise<string> {
    return this.delete({
      url: APP_KEYS.BACKEND_KEYS.DELETE(id)
    });
  }
}

const todoService = new TodoService();
export default todoService;
