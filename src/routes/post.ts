import { Router, Request, Response, NextFunction, response } from "express";
import pool from "../database/db";
import { Post } from "../types/types";
import { postSchema } from "../schema/post-schema";

const router = Router();

router.get("/post", async (req: Request<{}, {}, Post>, res: Response<Post[] | { error: string }>, next: NextFunction): Promise<void> => {
  try {
    const allPost = await pool.query("SELECT * from post");
    res.send(allPost.rows);
  }
  catch (error: unknown) {
    next(error);
  }
}
);

router.post("/post", async (req: Request<{}, {}, Post>, res: Response<Post | { error: string }>, next: NextFunction): Promise<void> => {
  const { post_user_id, post_content, post_date, post_tag } = req.body;

  // SCHEMA VALIDATION
  const validationResult = postSchema.validate({
    post_user_id,
    post_content,
    post_date,
    post_tag,
  });

  if (validationResult.error) {
    const details = validationResult.error.details[0].message;
    res.status(400).json({ error: details });
    // next(details)
  }

  try {
    const newPost = await pool.query(
      'INSERT INTO "post" (post_user_id, post_content, post_date, post_tag) VALUES ($1, $2, $3, $4) RETURNING *',
      [post_user_id, post_content, post_date, post_tag]
    );

    res.status(201).json(newPost.rows[0]); // 201 Created status
  }
  catch (error: unknown) {
    next(error);
  }
});

router.put("/post/:id", async (req: Request<{ id: string }, {}, Post>, res: Response<Post | { error: string }>, next: NextFunction): Promise<void> => {
  const { params: { id }, } = req;
  const { post_user_id, post_content, post_date, post_tag } = req.body;

  try {
    const newPost = await pool.query('UPDATE "post" SET post_user_id =$1, post_content = $2, post_date = $3, post_tag = $4 WHERE post_id = $5 RETURNING*', [post_user_id, post_content, post_date, post_tag, id]);
    res.json(newPost.rows[0]);
  }
  catch (error: unknown) {
    next(error);
  }
});

router.patch("/post/:id", async (req: Request<{ id: string }, {}, Post>, res: Response<Post | { error: string }>, next: NextFunction): Promise<void> => {
  const { params: { id } } = req;

  // requset the current post
  try {
    const result = await pool.query("SELECT * FROM post WHERE post_id = $1", [id]);

    // Detta gör samma som våra 4 if-checks
    let updated_post = { ...result.rows[0], ...req.body };

    // checkes if the client has updated data for all post values, if not then asign the data from current_post
    // if (!post_user_id) post_user_id = current_post.post_user_id;
    // if (!post_content) post_content = current_post.post_content;
    // if (!post_date) post_date = current_post.post_date;
    // if (!post_tag) post_tag = current_post.post_tag;

    const newPost = await pool.query('UPDATE "post" SET post_user_id =$1,  post_content = $2, post_date = $3, post_tag = $4 WHERE post_id = $5 RETURNING*', [updated_post.post_user_id, updated_post.post_content, updated_post.post_date, updated_post.post_tag, updated_post.id]);

    res.json(newPost.rows[0]);
  }
  catch (error: unknown) {
    next(error);
  }
});

router.delete("/post/:id", async (req: Request<{ id: string }, {}, Post>, res: Response<Post | { error: string }>, next: NextFunction): Promise<void> => {
  const { params: { id } } = req;

  try {
    const newPost = await pool.query('DELETE FROM "post" WHERE post_id = $1 RETURNING*', [id]);
    res.json(newPost.rows[0]);
  }
  catch (error: unknown) {
    next(error);
  }
});

export { router as postRouter };
