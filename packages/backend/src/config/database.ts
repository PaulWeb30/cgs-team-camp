/* eslint-disable no-console */

import { DataSource } from 'typeorm';
import { Todo } from '../entities/Todo.entity';
import { User } from '../entities/User.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT_DB),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  schema: process.env.POSTGRES_SCHEMA,
  entities: [Todo, User],
  synchronize: true,
  logging: ['query', 'error']
});

const connectDB = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Postgres Connected...');
  } catch (err: unknown) {
    if (err instanceof Error) console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
