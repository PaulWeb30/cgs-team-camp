import { Todo } from '../entities/Todo.entity';
import { ITodo } from '../types/todos.type';

export default class TodoService {
  async findAll() {
    const todos = await Todo.find();
    return todos;
  }

  async findOne(params: object) {
    const todo = await Todo.findOneBy(params);
    return todo;
  }

  async createTodo(todo: ITodo) {
    const newTodo = Todo.create(todo);
    await newTodo.save();
    return newTodo;
  }

  async deleteTodo(todoId: number) {
    await Todo.delete(todoId);
    return `Todo with id ${todoId} deleted succesfully`;
  }

  async updateTodo(id: string, body: ITodo) {
    const todo = await Todo.findOneBy({ id });
    const updatedTodo = await Todo.save({
      ...todo,
      ...body
    });
    return updatedTodo;
  }
}
