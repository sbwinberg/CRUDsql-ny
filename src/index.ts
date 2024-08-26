import { error } from "console";
import express, { Response, Request, NextFunction } from "express";
import { Pool, Client } from "pg";

const app = express();

// interface poolConfig {
//   user: string;
//   host: string;
//   database: string;
//   password: string;
//   port: number;
// }

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: parseInt(process.env.PORT || "5432"),
});

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

app.post("/posts", (req: Request, res: Response, next: NextFunction) => {
  const {
    body,
    params: { id },
  } = req.body;
});

app.put("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Jensa");
});

app.patch("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Jensa");
});

app.delete("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Jensa");
});

app.listen(SERVER_PORT, () => {
  console.log("Server started on: " + SERVER_PORT);
});
