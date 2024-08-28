import { Router, Request, Response } from "express";
import pool from "../database/db";

const router = Router();

// Define the interface for the request body
interface CreatePostRequest {
  post_id?: number;
  post_user_id: number;
  post_content: string;
  post_date: string;
  post_tag?: string;
}

// Define the interface for the response
interface CreatePostResponse {
  post_id: number;
  post_user_id: number;
  post_content: string;
  post_date: string;
  post_tag?: string;
}

router.post(
  "/post",
  async (
    req: Request<{}, {}, CreatePostRequest>,
    res: Response<CreatePostResponse | { error: string }>
  ): Promise<void> => {
    const { post_user_id, post_content, post_date, post_tag } = req.body;

    try {
      // Correct SQL query syntax
      const newPost = await pool.query(
        'INSERT INTO "post" (post_user_id, post_content, post_date, post_tag) VALUES ($1, $2, $3, $4) RETURNING *',
        [post_user_id, post_content, post_date, post_tag]
      );

      // Return the first row from the result as the new post
      res.status(201).json(newPost.rows[0]); // 201 Created status
    } catch (error: any) {
      // Log the error to the console for debugging
      console.error("Error creating post:", error.message);

      // Send an error response to the client
      res.status(500).json({ error: "Failed to create post" });
    }
  }
);

router.put(
  "/post/:id",
  async (
    req: Request<{ id: string }, {}, CreatePostRequest>,
    res: Response<CreatePostResponse | { error: string }>
  ): Promise<void> => {
    const {
      params: { id },
    } = req;

    const { post_content, post_date, post_tag } = req.body;
    try {
      const newPost = await pool.query(
        'UPDATE "post" SET post_content = $1, post_date = $2, post_tag = $3 WHERE post_id = $4 RETURNING*',
        [post_content, post_date, post_tag, id]
      );
      res.json(newPost.rows[0]);
    } catch (error: any) {
      console.error(error.message);
    }
  }
);

// Det går inte att uppdatera en , den andra blir null, fungerar som put just nu
router.patch(
  "/post/:id",
  async (
    req: Request<{ id: string }, {}, CreatePostRequest>,
    res: Response<CreatePostResponse | { error: string }>
  ): Promise<void> => {
    const {
      params: { id },
    } = req;
    const { post_content, post_date, post_tag } = req.body;

    try {
      const newPost = await pool.query(
        'UPDATE "post" SET post_content = $1, post_date = $2, post_tag = $3 WHERE post_id = $4 RETURNING*',
        [post_content, post_date, post_tag, id]
      );

      res.json(newPost.rows[0]);
    } catch (error: any) {
      console.error(error.message);
    }
  }
);

router.delete(
  "/post/:id",
  async (
    req: Request<{ id: string }, {}, CreatePostRequest>,
    res: Response<CreatePostResponse | { error: string }>
  ): Promise<void> => {
    const {
      params: { id },
    } = req;

    try {
      const newPost = await pool.query(
        'DELETE FROM "post" WHERE post_id = $1 RETURNING*',
        [id]
      );
      res.json(newPost.rows[0]);
    } catch (error: any) {
      console.error(error.message);
    }
  }
);

export { router as postRouter };