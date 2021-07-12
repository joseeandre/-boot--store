import supertest from 'supertest';
import server from '../src/server.js';
import connection from '../src/database/database.js';

const testUser = {
    name: "name",
    email: "email@bootcamp.com.br",
    password: "password",
};

beforeEach(async () => {
    await connection.query("DELETE FROM clients");
});

describe("POST /login", () => {
    it("returns 200 for valid params", async () => {
        const body = testUser;
        const createUser = await supertest(server).post("/sign-up").send(body);
        expect(createUser.status).toEqual(201);

        const bodyLogin = { email: testUser.email, password: testUser.password };
        const loginUser = await supertest(server).post("/sign-in").send(bodyLogin);
        expect(loginUser.status).toEqual(200);
    });

    it("returns 400 for login error", async () => {
        const invalidEmail = {
            email: "tests@email.com",
            password: "123456",
        };
        const invalidEmailResponse = await supertest(server)
            .post("/sign-in")
            .send(invalidEmail);
        expect(invalidEmailResponse.status).toEqual(400);

        const invalidPassword = { email: testUser.email, password: "123456" };
        const invalidPasswordResponse = await supertest(server)
            .post("/login")
            .send(invalidPassword);
        expect(invalidPasswordResponse.status).toEqual(404);
    });

});

afterAll(() => {
    connection.end();
});