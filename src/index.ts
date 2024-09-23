import express from "express";
import { errorHandler } from "./middleware/errorCatching";
import passport from "passport";
import session from "express-session";

//routes
import { campaignRoutes } from "./routes/campaign";
import { loginRouter } from "./routes/login";
import authRouter from "./routes/auth";

const app = express();
app.use(express.json());
app.use("/campaign", campaignRoutes);
app.use("/auth/github", authRouter )
// app.use("/", loginRouter); // test login
// app.use("/", checkAuthRoutes); // test
app.use(errorHandler);
// app.use(appErrorCathing);

// gitHubStrategy
app.use(session({
  secret: 'hemligt',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj: any, done) {
  done(null, obj);
})

const SERVER_PORT = process.env.SERVER_PORT || 1337;

app.listen(SERVER_PORT, () => {
  console.log("Server started on: " + SERVER_PORT);
});

