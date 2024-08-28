import { Router, Request, Response } from "express";
import pool from "../database/db";

const router = Router();

router.post("/user", async (req: Request, res: Response): Promise<void> => {
  const { user_name, email } = req.body;

  try {
    const newUser = await pool.query(
      'INSERT INTO "user" (user_name , email) VALUES ($1, $2) RETURNING *',
      [user_name, email]
    );
    res.json(newUser.rows[0]);
  }

  catch (error: any) {
    console.error(error.message);
  }
});


router.put("/user/:id", async (req: Request, res: Response): Promise<void> => {
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

interface userDatabase {
  user_name: string;
  email: string;
}

// Det går inte att uppdatera en , den andra blir null, fungerar som put just nu
router.patch("/user/:id", async (req: Request, res: Response): Promise<void> => {
  // hämtar user med id, sparar i lokal variable
  let current_user;
  const {
    params: { id },
  } = req;
  let { user_name, email } = req.body;

  // get the current user
  try {
    const result = await pool.query(
      'SELECT * FROM "user" WHERE user_id = $1',
      [id]
    );
    current_user = result.rows[0]

    // checkes if the client has updated data for user_name and/or email if not then asign the data from current_user
    if (!user_name) user_name = current_user.user_name;
    if (!email) email = current_user.email;
  } catch (error: any) {
    console.log(current_user, 'current_user catch');
    console.error(error.message);
  }


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

router.delete("/user/:id", async (req: Request, res: Response): Promise<void> => {
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

export {router as userRouter} ;