import { ITodo, IGetTodos, ITodoFilters } from '../common/types/todo.types';
import { HttpService } from './http.service';
import { APP_KEYS } from '../common/consts';

class TodoService extends HttpService {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  getTodos(data: ITodoFilters): Promise<IGetTodos> {
    return this.get({
      url: APP_KEYS.BACKEND_KEYS.ROOT(data.search, data.status, data.page)
    });
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

  deleteTodo(id: string) {
    return this.delete({
      method: 'delete',
      url: APP_KEYS.BACKEND_KEYS.DELETE(id)
    });
  }
}

const todoService = new TodoService();
export default todoService;
