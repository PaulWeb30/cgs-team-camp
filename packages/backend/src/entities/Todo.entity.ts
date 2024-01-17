import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TodoStatus } from '../types/todos.type';
// eslint-disable-next-line import/no-cycle
import { User } from './User.entity';

@Entity('todos')
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    default: false
  })
  isPrivate: boolean;

  @Column({
    type: 'enum',
    enum: TodoStatus,
    default: TodoStatus.PENDING
  })
  status: string;

  @ManyToOne(() => User, (user) => user.todos)
  author: User;
}
