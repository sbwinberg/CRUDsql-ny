import { Router } from "express";
import pool from "../db";

const router = Router();

router.post("/users", async (req, res) => {
  console.log(req.body);

  const { user_name, email, user_name2, email2 } = req.body;
  try {
    const newUser = await pool.query(
      'INSERT INTO "user" (user_name , email) VALUES ($1, $2),($3, $4) RETURNING *',
      [user_name, email, user_name2, email2]
    );
    console.log("hejs");
    res.json(newUser.rows[0]);
  } catch (error: any) {
    console.error(error.message);
  }
});

router.put("/put/:id", async (req, res) => {
  const {
    params: { id },
  } = req;

  const { user_name, email } = req.body;
  try {
    const newUser = await pool.query(
      'UPDATE "user" SET user_name = $1, email = $2 WHERE user_id = $3 RETURNING*',
      [user_name, email, id]
    );
    res.json(newUser.rows[0]);
  } catch (error: any) {
    console.error(error.message);
  }
});

router.patch("/patch/:id", async (req, res) => {
  const {
    params: { id },
  } = req;
  const { user_name, email } = req.body;

  try {
    const newUser = await pool.query(
      'UPDATE "user" SET user_name = $1, email = $2 WHERE user_id = $3 RETURNING*',
      [user_name, email, id]
    );

    res.json(newUser.rows[0]);
  } catch (error: any) {
    console.error(error.message);
  }
});

router.delete("/delete/:id", async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const newUser = await pool.query(
      'DELETE FROM "user" WHERE user_id = $1 RETURNING*',
      [id]
    );
    res.json(newUser.rows[0]);
  } catch (error: any) {
    console.error(error.message);
  }
});

export default router;
