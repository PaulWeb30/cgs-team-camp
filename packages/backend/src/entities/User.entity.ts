import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
// eslint-disable-next-line import/no-cycle
import { Todo } from './Todo.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @OneToMany(() => Todo, (todo) => todo.author)
  todos: Todo[];
}
