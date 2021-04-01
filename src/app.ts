import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import "express-async-errors";
import cors from 'cors';
import path from 'path';
import createConnection from "./database";
import { router, caminho } from "./routes";
import { AppError } from './errors/AppError';

createConnection();
const app = express();

// Acesso a partir de outros endereços
app.use(cors());

// Define variáveis de ambiente
import env from "./env";
process.env.NODE_ENV = env;

app.use(express.json());
app.use(router);

// public | html (index and favicon)
app.use("/favicon.png", express.static('/public/favicon.png'));
app.use('/', express.static(path.join(__dirname, '..', 'public')))
app.use('/documentacao', express.static(path.join(__dirname, '..', 'public/documentacao')))

// Acesso a partir de outros endereços
app.use(cors());

// Error
app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if(err instanceof AppError) {
      return response.status(err.statusCode).json({
        error: "Error",
        status: err.statusCode,
        message: err.message
      });
    }

    return response.status(500).json({
      error: "Error",
      status: "500",
      message: `Internal server error ${err.message}`
    })
  }
);

export { app, caminho };

/*
  * GET    => Buscar
  * POST   => Salvar
  * PUT    => Alterar
  * DELETE => Deletar
  * PATCH  => Alteracao Especifica
*/

// http://localhost:3333/users
// app.get("/users", (request, response) => {
//   return response.json({ message: "Hello World - NLW4" });
// });

// app.post("/users", (request, response) => {
//   return response.json({ message: "Os dados foram salvos com sucesso!" });
// });