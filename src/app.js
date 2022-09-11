import express, { json } from "express";
import cors from "cors";
import userRouter from "./routers/userRouter.js";
import transactionRouter from "./routers/transactionRouter.js";

const app = express();

app.use(cors());
app.use(json());

app.use(userRouter);
app.use(transactionRouter);

app.listen(5000);
