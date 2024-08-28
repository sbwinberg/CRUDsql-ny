import express, { Response, Request, NextFunction, Router } from "express";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("Jensa");
});

export { router as landingpage };