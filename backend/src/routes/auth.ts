import { Router } from "express";
import passport from "passport";
// import '../authStrategies/localStrategy'
// import '../authStrategies/githubStrategy';
import { Request, Response, NextFunction } from 'express';
import express from 'express';


declare global {
    namespace Express {
        interface User {
            id: string;
            email: string;
            name: string;
        }
    }
}

const app = express.Router();
// app.use(express.json());


// GITHUB STRATEGY 

app.get('/github',
    passport.authenticate('github'));

app.get('/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    function (req: Request, res: Response) {
        res.redirect('/profile');
    });

app.get('/profile', (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/auth/github');
    }
    res.json(req.user);
});

// localStrategy

app.post("/login", (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
        "local",
        (err: any, user: Express.User | false, info: any) => {
            if (err)
                return res.status(500).json({ message: "Internal server error" });
            if (!user)
                return res
                    .status(401)
                    .json({ message: info.message || "Invalid email or password" });
            req.logIn(user, (err) => {
                if (err)
                    return res.status(500).json({ message: "Internal server error" });
                res.json({
                    message: "Logged in successfully",
                    user: { id: user.id, email: user.email, name: user.name },
                    redirectUrl: "/campaigns",
                });
            });
        }
    )(req, res, next);
});

app.get('/profile', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    res.json(req.user);
})

export default app;