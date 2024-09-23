// import '../authStrategies/githubStrategy';
// import passport from "passport";
// import { Request, Response } from 'express';

// const express = require('express');
// const session = require('express-session');

// const app = express();


// app.use(session({
//     secret: 'hemligt',
//     resave: false,
//     saveUninitialized: true
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// app.get('/auth/github',
//     passport.authenticate('github'));

// app.get('/auth/github/callback',
//     passport.authenticate('github', { failureRedirect: '/' }),
//     function (req: Request, res: Response) {
//         res.redirect('/profile');
//     });

// passport.serializeUser(function (user, done) {
//     done(null, user);
// });

// passport.deserializeUser(function (obj: any, done) {
//     done(null, obj);
// })

// app.get('/profile', (req: Request, res: Response) => {
//     if (!req.isAuthenticated()) {
//         return res.redirect('/auth/github');
//     }
//     res.json(req.user);
// });

// app.listen(1337, () => {
//     console.log('Servern körs på http://localhost:1337');
// });