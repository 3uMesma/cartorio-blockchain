import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import documentRoutes from './routes/document.routes';

// Configuração Inicial
const app = express();
const port = 3000;

// Middlewares Globais
app.use(cors());
app.use(express.json());

// Rotas da Aplicação
app.use('/', documentRoutes);

// Inicia o Servidor
app.listen(port, () => {
    console.log(`Servidor back-end rodando em http://localhost:${port}`);
});