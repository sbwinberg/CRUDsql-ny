import express, { Request, Response, NextFunction } from "express";

const app = express();

class ValidationError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 400;
  }
}

class NotFoundError extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);

  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  if (err instanceof NotFoundError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  res.status(500).json({ error: "Error: 500. Unexpected error" });
}

// app.get("/error", (req, res, next) => {
//   try {
//     throw new Error("This is and intentional error");
//   } catch (err) {
//     next(err);
//   }
// });

// app.get("/validation-error", (req, res, next) => {
//   try {
//     throw new ValidationError("Invalid input data provided");
//   } catch (err) {
//     next(err);
//   }
// });

// app.get("/not-found", (req, res, next) => {
//   try {
//     throw new NotFoundError("Resource not found");
//   } catch (err) {
//     next(err);
//   }
// });

export {errorHandler};
export {app as appErrorCathing};

