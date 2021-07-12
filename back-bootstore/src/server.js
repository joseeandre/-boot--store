import express from "express";
import cors from "cors";
import { stripHtml } from "string-strip-html";
import connection from "./database/database.js";
import { insertShirtSchema } from './schemas/shirtsSchema.js';
import { insertPantsSchema } from './schemas/pantsSchema.js';
import { insertCategorySchema } from './schemas/categoriesSchema.js';
import { loginSchema, signUpSchema } from "./schemas/userSchemas.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

const server = express();

server.use(cors());
server.use(express.json());



server.post('/sign-in', async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (!error) {
      const { email, password } = req.body;
      const client = await connection.query(`SELECT * FROM clients WHERE email=$1`, [email]);
      if (client.rows.length > 0 && bcrypt.compareSync(password, client.rows[0].password)) {
        await connection.query(`UPDATE clients SET islogged=$1 WHERE id=$2`, [true, client.rows[0].id]);
        const token = uuid();
        await connection.query(`INSERT INTO sessions("clientId", token) VALUES ($1,$2)`, [client.rows[0].id, token]);
        res.send({ name: client.rows[0].name, email: email, id: client.rows[0].id, token: token });
      } else {
        res.sendStatus(400);
      }

    } else {
      res.sendStatus(400)
    }

  } catch {
    res.sendStatus(500);
  }
})

server.post('/sign-up', async (req, res) => {
  try {
    const { error } = signUpSchema.validate(req.body);
    if (!error) {
      const { name, email, password } = req.body;
      const checkClient = await connection.query(`SELECT * FROM clients WHERE email=$1`, [email]);
      if (checkClient.rows.length > 0) return res.sendStatus(409);

      const hash = bcrypt.hashSync(password, 10);
      const newClient = await connection.query(`INSERT INTO clients(name, email, password, islogged) VALUES ($1,$2,$3,$4)`, [name, email, hash, false]);
      res.sendStatus(201);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
})

server.post('/logout', async (req, res) => {
  try {
    if (!req.headers.authorization) return res.sendStatus(401);
    const token = req.headers.authorization.substring(7,);
    const clientId = await connection.query(`SELECT * FROM sessions WHERE token=$1`, [token]);
    await connection.query(`DELETE FROM sessions WHERE "clientId"=$1`, [clientId.rows[0].clientId]);
    await connection.query(`UPDATE clients SET islogged=$1 WHERE id=$2`, [false, clientId.rows[0].clientId]);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
})


server.get('/cart', async (req, res) => {
  if (!req.headers.authorization) return res.sendStatus(401);

  const token = req.headers.authorization.substring(7,);
  const client = await connection.query(`SELECT clients.*, sessions.token FROM clients JOIN sessions ON sessions."clientId" = clients.id WHERE sessions.token=$1`, [token]);
  if (client.rows.length === 0) return res.sendStatus(404);

  const pants = await connection.query(`SELECT pants.*, items.size, items.quantity FROM pants JOIN items ON pants.id = items."productId" WHERE items."productCategory" = 2 AND items."clientId"=$1`, [client.rows[0].id]);
  const shirts = await connection.query(`SELECT shirts.*, items.size, items.quantity FROM shirts JOIN items ON shirts.id = items."productId" WHERE items."productCategory" = 1 AND items."clientId"=$1`, [client.rows[0].id]);
  const cart = [...pants.rows, ...shirts.rows];
  res.send(cart);

})

server.post('/add-to-cart', async (req, res) => {
  if (!req.headers.authorization) return res.sendStatus(401);

  const token = req.headers.authorization.substring(7,);
  const client = await connection.query(`SELECT clients.*, sessions.token FROM clients JOIN sessions ON sessions."clientId" = clients.id WHERE sessions.token=$1`, [token]);
  if (client.rows.length > 0) {
    const { productId, productCategory, size } = req.body;
    const checkIfAdded = await connection.query(`SELECT * FROM items WHERE "productId"=$1 AND "productCategory"=$2 AND "clientId"=$3 AND size=$4`, [productId, productCategory, client.rows[0].id, size]);
    if (checkIfAdded.rows.length > 0) {
      await connection.query(`UPDATE items SET quantity=$1 WHERE id=$2`, [checkIfAdded.rows[0].quantity + 1, checkIfAdded.rows[0].id]);
    } else {
      await connection.query(`INSERT INTO items("productId","productCategory","clientId",size,quantity) VALUES ($1,$2,$3,$4,$5)`, [productId, productCategory, client.rows[0].id, size, 1]);
    }
    res.sendStatus(201);

  } else {
    res.sendStatus(404);
  }
})

server.post("/add-shirt", async (req, res) => {
  const errors = insertShirtSchema.validate(req.body).error;
  console.log(errors)
  if (errors) {
    return res.sendStatus(404);
  }
  server.post('/remove-from-cart', async (req, res) => {
    if (!req.headers.authorization) return res.sendStatus(401);

    const token = req.headers.authorization.substring(7,);
    const client = await connection.query(`SELECT clients.*, sessions.token FROM clients JOIN sessions ON sessions."clientId" = clients.id WHERE sessions.token=$1`, [token]);
    if (client.rows.length > 0) {
      const { productId, productCategory, size } = req.body;
      const item = await connection.query(`SELECT * FROM items WHERE "productId"=$1 AND "productCategory"=$2 AND "clientId"=$3 AND size=$4`, [productId, productCategory, client.rows[0].id, size]);
      if (item.rows[0].quantity === 1) {
        await connection.query(`DELETE FROM items WHERE id=$1`, [item.rows[0].id]);
      } else {
        await connection.query(`UPDATE items SET quantity=$1 WHERE id=$2`, [item.rows[0].quantity - 1, item.rows[0].id]);
      }
      res.sendStatus(200);

    } else {
      res.sendStatus(404);
    }
  })

  server.post('/checkout', async (req, res) => {
    if (!req.headers.authorization) return res.sendStatus(401);

    const token = req.headers.authorization.substring(7,);
    const client = await connection.query(`SELECT clients.*, sessions.token FROM clients JOIN sessions ON sessions."clientId" = clients.id WHERE sessions.token=$1`, [token]);
    if (client.rows.length > 0) {
      const { total, date } = req.body;
      await connection.query(`DELETE FROM items WHERE "clientId"=$1`, [client.rows[0].id]);
      await connection.query(`INSERT INTO checkouts("clientId",total,date) VALUES ($1,$2,$3)`, [client.rows[0].id, total, date]);
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  })

  try {
    const name = stripHtml(req.body.name.trim()).result;
    const image = stripHtml(req.body.image.trim()).result;
    const description = stripHtml(req.body.description.trim()).result;
    const category_id = req.body.category_id;
    const price = req.body.price.trim();
    const color = req.body.color.trim();

    const categoryCheck = await connection.query(`SELECT * FROM categories WHERE id = $1`, [category_id]);

    if (categoryCheck.rows.length === 0) {
      res.sendStatus(409);
    } else {
      await connection.query(
        `INSERT INTO shirts (
              name,
              image,
              description,
              category_id,
              price,
              color
              ) VALUES ($1, $2, $3, $4, $5, $6)`,
        [name, image, description, category_id, price, color]
      );

      res.sendStatus(201);
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

server.post("/add-pants", async (req, res) => {
  const errors = insertPantsSchema.validate(req.body).error;
  console.log(errors)
  if (errors) {
    return res.sendStatus(404);
  }

  try {
    const name = stripHtml(req.body.name.trim()).result;
    const image = stripHtml(req.body.image.trim()).result;
    const description = stripHtml(req.body.description.trim()).result;
    const category_id = req.body.category_id;
    const price = req.body.price.trim();

    const categoryCheck = await connection.query(`SELECT * FROM categories WHERE id = $1`, [category_id]);

    if (categoryCheck.rows.length === 0) {
      res.sendStatus(409)
    } else {
      await connection.query(
        `INSERT INTO pants (
              name,
              image,
              description,
              category_id,
              price
              ) VALUES ($1, $2, $3, $4, $5)`,
        [name, image, description, category_id, price]
      );

      res.sendStatus(201);
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

server.post("/add-category", async (req, res) => {
  const errors = insertCategorySchema.validate(req.body).error;
  console.log(errors)
  if (errors) {
    return res.sendStatus(404);
  }
  try {
    const name = stripHtml(req.body.name.trim()).result;

    const nameRequest = await connection.query('SELECT * FROM categories WHERE name = $1', [name])

    if (nameRequest.rows.length > 0) {
      res.sendStatus(409);
    } else {
      await connection.query(
        `INSERT INTO categories (
              name
              ) VALUES ($1)`,
        [name]
      );

      res.sendStatus(201);
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});


server.get("/shirts", async (req, res) => {
  try {
    const id = req.query.id;

    if (id === undefined) {
      const response = await connection.query(
        `SELECT * FROM shirts`
      );
      res.send(response.rows);
    } else {
      const response = await connection.query(
        `SELECT * FROM shirts WHERE id = $1`,
        [id]);
      res.send(response.rows);
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

server.get("/pants", async (req, res) => {
  try {
    const id = req.query.id;

    if (id === undefined) {
      const response = await connection.query(
        `SELECT * FROM pants`
      );
      res.send(response.rows);
    } else {
      const response = await connection.query(
        `SELECT * FROM pants WHERE id = $1`,
        [id]);
      res.send(response.rows);
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

const port = (process.env.PORT || 4000);

server.listen(port, () => {
  console.log("Server running on port " + port);
});

export default server;