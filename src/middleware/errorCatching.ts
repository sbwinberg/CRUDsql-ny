import express, { Request, Response, NextFunction } from "express";

const app = express();
function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);

  if (err instanceof SyntaxError) {
    return res.status(400).json({ error: "Invalid JSON syntax" });
  }

  res.status(500).json({ error: "An unexpected error occurred" });
}

app.get("/error", (req, res, next) => {
  try {
    throw new Error("This is and intentional error");
  } catch (err) {
    next(err);
  }

  
});

export default errorHandler;