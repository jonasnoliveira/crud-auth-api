import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Column()
  email!: string;

  @Column()
  age!: number;

  @Column()
  role!: string;

  @Column()
  isActive!: boolean;

  @Column()
  createdAt!: Date;

  @Column()
  updatedAt!: Date;

  constructor(username: string, password: string, email: string, age: number, role: string, isActive: boolean) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.age = age;
    this.role = role;
    this.isActive = isActive;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
