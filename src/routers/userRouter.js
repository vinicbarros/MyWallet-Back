import { Router } from "express";
import { userSignIn, userSignUp } from "../controllers/userController.js";
import signInSchemaMiddleware from "../middlewares/signInSchemaMiddleware.js";
import userSchemaMiddleware from "../middlewares/userSchemaMIddleware.js";

const userRouter = Router();

userRouter.post("/sign-up", userSchemaMiddleware, userSignUp);

userRouter.post("/", signInSchemaMiddleware, userSignIn);

export default userRouter;
