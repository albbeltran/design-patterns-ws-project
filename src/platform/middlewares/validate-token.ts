import { NextFunction, Response } from 'express';
import jwt from "jsonwebtoken";
import { CODE_ERRORS } from '@example-api/constants';
import config from '../config';
import { constants } from 'http2';
import { CustomError } from '../lib/class/general-error';
import { CustomRequest } from '../server';

// Destructuring constants to get the HTTP error needed
const { HTTP_STATUS_UNAUTHORIZED } = constants;

//* Verify jwt token and handle errors
export const validateToken = async (
  req: CustomRequest,
  _: Response,
  next: NextFunction
) => {
  try {
    // if req does not include access token throw error
    if (!req.accessToken) {
      throw new CustomError({
        code: CODE_ERRORS.UNAUTHORIZED,
        httpCode: HTTP_STATUS_UNAUTHORIZED,
      });
    }
    // verify token 
    req.dataTokenUser = jwt.verify(req.accessToken, config.auth.secret);
    next();
  } catch (error) {
    next(error);
  }
};
