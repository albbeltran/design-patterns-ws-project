//* Initialize router

import { Router } from 'express';
import { userRouter } from './user';

// initialize router to use app v1 endpoint
const v1Routes = Router();

// app v1 uses user router endpoinst
v1Routes.use("/v1/user", userRouter);

export { v1Routes };
