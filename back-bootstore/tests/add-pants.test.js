import supertest from 'supertest';
import server from '../src/server.js';
import connection from '../src/database/database.js';


describe("POST /add-pants", () => {
  it("returns 201 for valid params", async () => {
    const body = {
      name: 'calca teste',
      image: 'https://somarmalhas.com.br/site/wp-content/uploads/2018/04/marinho-247x296.jpg', 
      description: 'Teste da calca',
      category_id: 2,
      price: '10.00',
    }
    const addPants = await supertest(server).post("/add-pants").send(body);
    expect(addPants.status).toEqual(201);
  });

  it("returns 404 for invalid parameters", async () => {
    const body = {
        name: 'calca teste',
        image: 'https://somarmalhas.com.br/site/wp-content/uploads/2018/04/marinho-247x296.jpg', 
        description: 'Teste da calca',
        category_id: 2,
        price: 5,
      }
    const addPants = await supertest(server).post("/add-pants").send(body);
    expect(addPants.status).toEqual(404);
  });

  it("returns 409 for invalid category id", async () => {
    const body = {
        name: 'calca teste',
        image: 'https://somarmalhas.com.br/site/wp-content/uploads/2018/04/marinho-247x296.jpg', 
        description: 'Teste da calca',
        category_id: 1000,
        price: '10.00',
      }
    const addPants = await supertest(server).post("/add-pants").send(body);
    expect(addPants.status).toEqual(409);
  });
});
beforeEach(async () => {
  await connection.query('DELETE FROM pants');
});

afterAll(() => {
  connection.end();
});