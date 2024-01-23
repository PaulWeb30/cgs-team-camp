import { Todo } from '../entities/Todo.entity';
import { ITodo } from '../types/todos.type';

export default class TodoService {
  async findAll() {
    const todos = await Todo.find({
      order: {
        id: 'ASC'
      }
    });
    return todos;
  }

  async findOne(params: object) {
    const todo = await Todo.findOne({ where: params, relations: ['author'] });

    return todo;
  }

  async createTodo(todo: ITodo) {
    const newTodo = await Todo.create(todo);
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
