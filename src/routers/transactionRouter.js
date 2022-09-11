import { Router } from "express";
import {
  getTransactions,
  postTransactions,
} from "../controllers/transactionController.js";
import auth from "../middlewares/authorizationMiddleware.js";
import postTransactionMiddleware from "../middlewares/postTransactionMiddleware.js";

const transactionRouter = Router();

transactionRouter.post(
  "/transactions",
  auth,
  postTransactionMiddleware,
  postTransactions
);

transactionRouter.get("/transactions", auth, getTransactions);

export default transactionRouter;
