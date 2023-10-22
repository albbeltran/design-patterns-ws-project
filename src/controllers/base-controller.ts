//* Base class to implement success and error responses

import { injectable } from 'inversify';
import { Request, Response } from 'express';
import { errorHandler } from '@example-api/platform/middlewares/error-handler';
import { CustomError } from '@example-api/platform/lib/class/general-error';
import { CustomRequest } from '../platform';

@injectable()
/**
 ** Abstract to implement success and error response methods
 */
export abstract class BaseController {
  /**
   ** Abstract method to execute a request and return a response
   * @param request Parameter of type request to execute
   * @param response Parameter of type response to return
   */
  public abstract execute(
    request: Request,
    response: Response
  ): Promise<Response>;

  /**
   ** Method to create the response if request is success
   * @param req 
   * @param res 
   * @param httpCode 
   * @param dto 
   * @returns 
   */
  protected ok<T>(
    req: CustomRequest,
    res: Response,
    httpCode: number,
    dto?: T
  ): Response {
    console.info(
      `[END] - Path: ${req.originalUrl}`,
      BaseController.name,
      req.requestId
    );
    if (dto) {
      res.type('application/json');
      return res.status(httpCode).json(dto);
    }

    return res.sendStatus(httpCode);
  }

  /**
   ** Method to create the response if request failed
   * @param req 
   * @param res 
   * @param httpCode 
   * @param error 
   * @returns 
   */
  protected fail(
    req: CustomRequest,
    res: Response,
    httpCode: number,
    error: CustomError
  ): Response {
    if (!error.httpCode) {
      error.httpCode = httpCode;
    }
    console.info(
      `[END] - Path: ${req.originalUrl}`,
      BaseController.name,
      req.requestId
    );
    return errorHandler(error, req, res);
  }
}
