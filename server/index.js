import express from "express";
import dotenv from "dotenv";
import { connect } from "./db.js";
import userRouter from "./routers/User.js";
import postRouter from "./routers/Post.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 8000;
app.use(express.json());
app.use("/uploads/", express.static("uploads"));
connect();

app.use("/user/", postRouter);
app.use("/auth/", userRouter);

app.listen(port, () => console.log(port));
