import "dotenv/config";
import express from "express";
import sequelize from "./app/include/database.js";
import router from "./app/routes/routes.js";
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Receipts_Images from "./app/models/receipts_images.js";
import Receipt from "./app/models/receipt.js";

const app = express();

global.__filename = fileURLToPath(import.meta.url);
global.__dirname = path.join(path.dirname(__filename), '/app');

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static('uploads'))

app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(router);

// sequelize.sync({alter: true});

app.listen(process.env.PORT);
