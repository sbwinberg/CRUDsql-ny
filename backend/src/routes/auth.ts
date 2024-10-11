import { Router } from "express";
import passport from "passport";
import '../authStrategies/localStrategy'
import '../authStrategies/githubStrategy';
import { Request, Response } from 'express';
import express from 'express';


const app = Router();
app.use(express.json());

// GITHUB STRATEGY 

app.get('/',
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

app.post('/login', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
}));

app.get('/profile', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    res.json(req.user);
})

export default app;