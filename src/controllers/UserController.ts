// src/controllers/UserController.ts
import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const JWT_SECRET = 'seu_segredo_super_secreto';

export class UserController {
  private userService = new UserService();

  async register(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    try {
      const user = await this.userService.createUser(username, password);
      res.status(201).json({ id: user.id, username: user.username });
      return; // Ensure void by not returning `res`
    } catch (error) {
      res.status(500).json({ error: 'Erro ao registrar usuário.', details: error });
      return; // Explicitly end the method with a `return`
    }
  }
  

  async login(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    try {
      const user = await this.userService.findUserByUsername(username);
      if (!user) {
        res.status(404).json({ error: 'Usuário não encontrado.' });
        return;
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ error: 'Credenciais inválidas.' });
        return;
      }
  
      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
        expiresIn: '1h',
      });
      res.json({ token });
      return;
    } catch (error) {
      res.status(500).json({ error: 'Erro ao realizar login.', details: error });
      return;
    }
  }
  

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.findAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar usuários.', details: error });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { username, password } = req.body;
    try {
      const user = await this.userService.updateUser(parseInt(id, 10), username, password);
      if (!user) {
        res.status(404).json({ error: 'Usuário não encontrado.' });
        return; // Explicitly end the function
      }
  
      res.json({ id: user.id, username: user.username });
      return; // Explicitly end the function
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar usuário.', details: error });
      return; // Explicitly end the function
    }
  }  

  async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const success = await this.userService.deleteUser(parseInt(id, 10));
      if (!success) {
        res.status(404).json({ error: 'Usuário não encontrado.' });
        return; // Explicitly end the function
      }
  
      res.json({ message: 'Usuário deletado com sucesso.' });
      return; // Explicitly end the function
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar usuário.', details: error });
      return; // Explicitly end the function
    }
  }
  
}