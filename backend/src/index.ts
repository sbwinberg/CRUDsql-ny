import express from "express";
import { errorHandler } from "./middleware/errorCatching";
import passport from "passport";
import session from "express-session";
import cors from 'cors';

//routes
import { campaignRoutes } from "./routes/campaign";
import authRouter from "./routes/auth";
import { router as userRouter } from "./routes/user";

const app = express();

// gitHubStrategy
app.use(
  session({
    secret: "hemligt",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cors())

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj: any, done) {
  done(null, obj);
});

// ROUTES
app.use(errorHandler);
app.use(express.json());
app.use("/campaign", campaignRoutes);
app.use("/users", userRouter);
app.use("/auth/github", authRouter);

const SERVER_PORT = process.env.SERVER_PORT || 1337;

app.listen(SERVER_PORT, () => {
  console.log("Server started on: " + SERVER_PORT);
});
