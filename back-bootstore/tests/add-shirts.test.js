import supertest from 'supertest';
import pg from 'pg';
import server from '../src/server.js';
import connection from '../src/database/database.js';


describe("POST /add-shirt", () => {
  it("returns 201 for valid params", async () => {
    const body = {
      name: 'camisa teste',
      image: 'https://somarmalhas.com.br/site/wp-content/uploads/2018/04/marinho-247x296.jpg', 
      description: 'Teste da camiseta azul',
      category_id: 1,
      price: '10.00',
      color: 'blue'
    }
    const addShirt = await supertest(server).post("/add-shirt").send(body);
    expect(addShirt.status).toEqual(201);
  });

  it("returns 404 for invalid parameters", async () => {
    const body = {
      name: 'camisa teste',
      image: 'https://somarmalhas.com.br/site/wp-content/uploads/2018/04/marinho-247x296.jpg', 
      description: 'Teste da camiseta azul',
      category_id: 1,
      price: '10.00',
      color: 3
    }
    const addShirt = await supertest(server).post("/add-shirt").send(body);
    expect(addShirt.status).toEqual(404);
  });

  it("returns 409 for invalid category id", async () => {
    const body = {
      name: 'camisa teste',
      image: 'https://somarmalhas.com.br/site/wp-content/uploads/2018/04/marinho-247x296.jpg', 
      description: 'Teste da camiseta azul',
      category_id: 1000,
      price: '10.00',
      color: 'blue'
    }
    const addShirt = await supertest(server).post("/add-shirt").send(body);
    expect(addShirt.status).toEqual(409);
  });
});
beforeEach(async () => {
  await connection.query('DELETE FROM shirts');
});

afterAll(() => {
  connection.end();
});