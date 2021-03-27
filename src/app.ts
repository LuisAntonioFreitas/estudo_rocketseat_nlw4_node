import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import "express-async-errors";
import createConnection from "./database";
import { router } from "./routes";
import { AppError } from './errors/AppError';

createConnection();
const app = express();

// Define variáveis de ambiente
import env from "./env";
process.env.NODE_ENV = env;

app.use(express.json());
app.use(router);

// Error
app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if(err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message
      });
    }

    return response.status(500).json({
      status: "Error",
      message: `Internal server error ${err.message}`
    })
  }
);

export { app };

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