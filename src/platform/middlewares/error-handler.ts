//* Methods to handle errors

import { ICustomError } from '@example-api/interfaces';
import { defaults } from '@example-api/constants';
import { constants } from 'http2';
import { ErrorRequestHandler, Response, NextFunction } from 'express';
import { CustomRequest } from '../server';
import { CustomError } from '../lib/class/general-error';

// Destructuring constants to get the error needed
const { HTTP_STATUS_INTERNAL_SERVER_ERROR } = constants;

/**
 * 
 * @param error Parameter of custom error type
 * @param translatedMessage Parameter for error message
 * @returns Error an object with error code and message
 */
const buildResponse = (error: ICustomError, translatedMessage: string) => {
  return {
    code: error.code,
    message: error.code ? translatedMessage : error.message,
  };
};

/**
 ** Error handler method to get error message and create an error response
 * @param error Parameter of custom error type
 * @param req Parameter of custom request type
 * @param res Parameter of express response type
 * @returns error response
 */
export const errorHandler = (
  error: CustomError,
  req: CustomRequest,
  res: Response
) => {
  try {
    console.error(error, req.requestId);
    // Get error message, if does not exists, get default message
    const translatedMessage = error.message || defaults.ERROR_MESSAGE;
    // Create error response
    const response = buildResponse(error, translatedMessage);
    return res
      .status(error.httpCode || HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json(response);
  } catch (err) {
    return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json(err);
  }
};

export const errorHandlerMiddleWare: ErrorRequestHandler = (
  error: CustomError,
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  errorHandler(error, req, res);
};
