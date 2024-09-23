import express from "express";
import { errorHandler } from "./middleware/errorCatching";
import "./authStrategies/local-strategy";

//routes
import { landingpage } from "./routes";
import { campaignRoutes } from "./routes/campaign";
import { loginRouter } from "./routes/login";
import { checkAuthRoutes } from "./routes/testRoutesCheckAuthorization";

const app = express();
app.use(express.json());
app.use("/", landingpage);
app.use("/", campaignRoutes);
app.use("/", loginRouter); // test login
app.use("/", checkAuthRoutes); // test
app.use(errorHandler);
// app.use(appErrorCathing);

const SERVER_PORT = process.env.SERVER_PORT || 1337;

app.listen(SERVER_PORT, () => {
  console.log("Server started on: " + SERVER_PORT);
});
