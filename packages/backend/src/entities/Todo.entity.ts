import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
    default: false
  })
  isCompleted: boolean;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  author?: User;
}
