//* Defines endpoints and execute controllers

import { Router } from "express";
import { container } from "@example-api/config/inversify";
import {
  UserSignupController,
  UserSigninController,
} from "@example-api/controllers";

// signup controller
const signup = container.get(UserSignupController);
// signin controller
const signin = container.get(UserSigninController);

// initialize router to use sign in and sign up endpoints
const userRouter = Router();

// endpoints
userRouter.post("/signin", (req, res) => signin.execute(req, res));

userRouter.post("/signup", (req, res) => signup.execute(req, res));


export { userRouter };
