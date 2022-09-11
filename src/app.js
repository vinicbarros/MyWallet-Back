import express, { json } from "express";
import cors from "cors";
import userRouter from "./routers/userRouter.js";

const app = express();

app.use(cors());
app.use(json());

app.use(userRouter);

app.listen(5000);
