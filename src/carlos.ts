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

export default router;
