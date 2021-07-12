import supertest from 'supertest';
import server from '../src/server.js';
import connection from '../src/database/database.js';

const testUser = {
    name: "name",
    email: "email@bootcamp.com.br",
    password: "password",
};

beforeEach(async () => {
    await connection.query(`DELETE FROM clients`);
});

describe("POST /sign-up", () => {
    it("returns 201 for valid params", async () => {
        const body = {
            name: testUser.name,
            password: testUser.password,
            email: testUser.email,
        };
        const result = await supertest(server).post("/sign-up").send(body);
        const status = result.status;
        expect(status).toEqual(201);
    });

    it("returns 409 for duplicate emails", async () => {
        const body = {
            name: testUser.name,
            password: testUser.password,
            email: testUser.email,
        };
        const firstUser = await supertest(server).post("/sign-up").send(body);
        expect(firstUser.status).toEqual(201);
        const secondUser = await supertest(server).post("/sign-up").send(body);
        expect(secondUser.status).toEqual(409);
    });

    it("returns 404 for invalid parameters", async () => {
        const body = {
            name: 3,
            password: testUser.password,
            email: testUser.email,
        };
        const invalidRequest = await supertest(server)
            .post("/sign-up")
            .send(body);
        expect(invalidRequest.status).toEqual(404);

    });
});

afterAll(() => {
    connection.end();
});