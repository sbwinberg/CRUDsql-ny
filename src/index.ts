import express from "express";
import { userRouter } from "./routes/user";
import { landingpage } from "./routes";
import { postRouter } from "./routes/post";
import errorHandler from "./middleware/errorCatching"

const app = express();
app.use(express.json());
app.use("/", userRouter);
app.use("/", postRouter);
app.use("/", landingpage);
app.use(errorHandler)

const SERVER_PORT = process.env.SERVER_PORT || 1337;

app.listen(SERVER_PORT, () => {
  console.log("Server started on: " + SERVER_PORT);
});