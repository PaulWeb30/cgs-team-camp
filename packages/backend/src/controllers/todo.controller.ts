import { Response, Request } from 'express';
import { User } from '../entities/User.entity';
import TodoService from '../services/todo.service';

export class TodoController {
  constructor(private todoService: TodoService) {}

  async getAllTodo(_: Request, res: Response) {
    const todos = await this.todoService.findAll();
    res.send(todos);
  }

  async getTodo(req: Request, res: Response) {
    const { id } = req.params;
    const todo = await this.todoService.findOne({ id });
    res.send(todo);
  }

  async createTodo(req: Request, res: Response) {
    const { body } = req;
    const userId = req.user;

    const todo = await this.todoService.createTodo({ ...body, author: userId });
    res.send(todo);
  }

  async deleteTodo(req: Request, res: Response) {
    const { id } = req.params;
    const todo = await this.todoService.deleteTodo(Number(id));
    res.send(todo);
  }

  async updateTodo(req: Request, res: Response) {
    const { id: userId } = req.user as User;
    const { id } = req.params;

    const todo = await this.todoService.updateTodo(id, { ...req.body, author: userId });
    res.send(todo);
  }
}

const todoController = new TodoController(new TodoService());
export default todoController;
