import express from "express";
import userRouter from "./routes/user";
import { landingpage } from "./routes";

const app = express();
app.use(express.json());
app.use("/", userRouter);
app.use("/", landingpage);

const SERVER_PORT = process.env.SERVER_PORT || 1337;

app.listen(SERVER_PORT, () => {
  console.log("Server started on: " + SERVER_PORT);
});