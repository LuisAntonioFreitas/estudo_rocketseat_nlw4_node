import request from 'supertest';
import { getConnection } from 'typeorm';
import { app, caminho } from "../app";

import createConnection from "../database";

describe("Surveys", async () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.query("DELETE FROM surveys;");
  });

  // afterAll(async () => {
  //   const connection = getConnection();
  //   await connection.dropDatabase();
  //   await connection.close();
  // });

  it("criando uma enquete na tabela surveys", async () => {
    const response = await request(app).post(caminho + "/surveys")
    .send({ 
      title: "Title Example", 
      description: "Description Example"
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("não criando uma enquete na tabela surveys por duplicação de title", async () => {
    const response = await request(app).post(caminho + "/surveys")
    .send({ 
      title: "Title Example", 
      description: "Description Example"
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  it("mostrando uma lista de enquetes da tabela surveys", async () => {
    await request(app).post(caminho + "/surveys")
    .send({ 
      title: "Title Example 2", 
      description: "Description Example 2"
    });

    const response = await request(app).get(caminho + "/surveys");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });
});