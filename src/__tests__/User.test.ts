import request from 'supertest';
import { app } from "../app";

import createConnection from "../database";

describe("Users", async () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.query("DELETE FROM users;");
  });

  // afterAll(async () => {
  //   const connection = getConnection();
  //   await connection.dropDatabase();
  //   await connection.close();
  // });

  it("criando um usuário na tabela users", async () => {
    const response = await request(app).post("/users")
    .send({ 
      name: "User Example", 
      email: "user@example.com"
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("não criando um usuário na tabela users por duplicação de email", async () => {
    const response = await request(app).post("/users")
    .send({ 
      name: "User Example", 
      email: "user@example.com"
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });
});