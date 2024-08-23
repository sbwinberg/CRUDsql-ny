// import { Router } from "express";
// import pool from "../db";

// const router = Router();

// router.post("/users", async (req, res) => {
//   const { name, email, adress } = req.body;
//   try {
//     const newUser = await pool.query(
//       "INSERT INTO users (name, email, adress) VALUES ($1, $2, $3)(ny user) RETURNING *",
//       [name, email, adress]
//     );
//     res.json(newUser.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// export default router;
