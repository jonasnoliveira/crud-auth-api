import { DataSource } from 'typeorm'
import { User } from '../entities/User';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'crud_db',
  synchronize: true,
  logging: false,
  entities: [User], // Ensure your entity is listed here
});
