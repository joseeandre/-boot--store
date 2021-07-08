import express from "express";
import cors from "cors";
import { stripHtml } from "string-strip-html";
import connection from "./database/database.js";

const server = express();

server.use(cors());
server.use(express.json());

server.post("/add-shirt", async (req, res) => {
    try {
      const name = stripHtml(req.body.name.trim()).result;
      const image = stripHtml(req.body.image.trim()).result;
      const description = stripHtml(req.body.description.trim()).result;
      const category_id = req.body.category_id;
      const price = req.body.price.trim();
      const color = req.body.color.trim();
  
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
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });

  server.post("/add-pants", async (req, res) => {
    try {
      const name = stripHtml(req.body.name.trim()).result;
      const image = stripHtml(req.body.image.trim()).result;
      const description = stripHtml(req.body.description.trim()).result;
      const category_id = req.body.category_id;
      const price = req.body.price.trim();
  
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
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });

  server.post("/add-category", async (req, res) => {
    try {
      const name = stripHtml(req.body.name.trim()).result;
  
      await connection.query(
        `INSERT INTO categories (
            name
            ) VALUES ($1)`,
        [name]
      );
  
      res.sendStatus(201);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });


server.get("/shirts", async (req, res) => {
    try {
      const id = req.query.id;

      if(id === undefined) {
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

      if(id === undefined) {
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