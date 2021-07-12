import supertest from 'supertest';
import server from '../src/server.js';
import connection from '../src/database/database.js';


describe("POST /add-category", () => {
  it("returns 201 for valid params", async () => {
    const body = {
      name: 'categoria teste'
    }
    const addCategory = await supertest(server).post("/add-category").send(body);
    expect(addCategory.status).toEqual(201);
  });

  it("returns 404 for invalid parameters", async () => {
    const body = {
        name: 3
      }
    const addCategory = await supertest(server).post("/add-category").send(body);
    expect(addCategory.status).toEqual(404);
  });

  it("returns 409 if name exists", async () => {
    const body = {
        name: 'categoria teste1'
      }
    const firstAddCategory = await supertest(server).post("/add-category").send(body);
    const secondAddCategory = await supertest(server).post("/add-category").send(body);
    expect(firstAddCategory.status).toEqual(201);
    expect(secondAddCategory.status).toEqual(409);
  });
});
beforeEach(async () => {
  await connection.query('DELETE FROM categories');
});

afterAll(() => {
  connection.end();
});