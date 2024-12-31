import { AppDataSource } from '../config/data-source';
import { User } from '../entities/User';
import bcrypt from 'bcrypt';

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async createUser(username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({ username, password: hashedPassword });
    return this.userRepository.save(newUser);
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  async findAllUsers(): Promise<Partial<User>[]> {
    return this.userRepository.find({ select: ['id', 'username'] });
  }

  async updateUser(id: number, username?: string, password?: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) return null;

    if (username) user.username = username;
    if (password) user.password = await bcrypt.hash(password, 10);

    return this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) return false;

    await this.userRepository.remove(user);
    return true;
  }
}