import "reflect-metadata";
import express from 'express';
import { json } from 'body-parser';
import { AppDataSource } from './config/data-source';
import { UserRoutes } from './routes/user.routes';

const app = express();
const PORT = 3000;

app.use(json());
app.use('/api/users', UserRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log('Banco de dados conectado com sucesso.');
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log('Erro ao conectar ao banco de dados:', error));