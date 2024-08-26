import { error } from "console";
import express, { Response, Request, NextFunction } from "express";
// import { Pool, Client } from "pg";

import pool from "../db";

import userRouter from "./carlos";
// import dotenv from "dotenv";

const app = express();
app.use(express.json());
app.use("/", userRouter);

// interface poolConfig {
//   user: string;
//   host: string;
//   database: string;
//   password: string;
//   port: number;
// }

async () => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query("Select current_user");
    const currentUser = rows[0]["current_user"];
    console.log(currentUser);
  } catch (err) {
    console.log(error);
  } finally {
    client.release();
  }
};

const SERVER_PORT = process.env.SERVER_PORT || 1337;

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Jensa");
});

app.listen(SERVER_PORT, () => {
  console.log("Server started on: " + SERVER_PORT);
});

export default pool;
