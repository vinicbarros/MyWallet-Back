import { Router } from "express";
import {
  deleteTransaction,
  getTransactions,
  postTransactions,
} from "../controllers/transactionController.js";
import auth from "../middlewares/authorizationMiddleware.js";
import authDelete from "../middlewares/deleteTransactionMiddleware.js";
import postTransactionMiddleware from "../middlewares/postTransactionMiddleware.js";

const transactionRouter = Router();

transactionRouter.post(
  "/transactions",
  auth,
  postTransactionMiddleware,
  postTransactions
);

transactionRouter.get("/transactions", auth, getTransactions);

transactionRouter.delete("/transactions/:id", authDelete, deleteTransaction);

export default transactionRouter;
