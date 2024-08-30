import { Router, Request, Response, NextFunction } from "express";
import { CreatePostResponse, CreateUserResponse } from "../types/types";
import pool from "../database/db";

const router = Router();

// Hämta alla användare tillsammans med antalet inlägg de har skapat.
router.get(
  "/spec1",
  async (
    req: Request,
    res: Response<CreateUserResponse[] | CreatePostResponse[] | { error: string }>,
    next: NextFunction
  ): Promise<void> => {

    try {
      const postCounter = await pool.query(
        `SELECT "user".user_name, COUNT(post.post_user_id) AS number_of_posts
        FROM "user"
        LEFT OUTER JOIN post
        ON post.post_user_id = "user".user_id
        GROUP BY "user".user_id
        `
      );
      res.send(postCounter.rows);
    } catch (error: unknown) {
      next(error);
    }
  }
);

export {router as specRouter};