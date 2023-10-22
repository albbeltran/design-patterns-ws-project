//* Sign up controller, implementing domain sign up but with error handling 

import { inject, injectable } from "inversify";
import { SYMBOLS } from "@example-api/config/symbols";
import { Response } from "express";
import { constants } from "http2";

// Get domain sign in to execute business rules
import { SignupUseCase } from "@example-api/domain";
import { CustomRequest } from "@example-api/platform/server/types";
import { CustomError } from "@example-api/platform/lib/class/general-error";
import { BaseController } from "../base-controller";

// Destructuring constants to get HTTP status needed
const {
  HTTP_STATUS_CREATED,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
} = constants;

@injectable()

//*Sign up controller class implementing base controller class to return a success or fail response
export class UserSignupController extends BaseController {
  private signup: SignupUseCase;

  public constructor(
    @inject(SYMBOLS.SignupUseCase)
    signup: SignupUseCase
  ) {
    super();
    this.signup = signup;
  }

  /**
 ** Execute method, acording to domain sign in execution, to create a new user
 * @param request Parameter with custom request containing user data
 * @param response Parameter with success or error response to produce
 * @returns Succesful o error response implementing BaseController methods
 */
  async execute(request: CustomRequest, response: Response): Promise<Response> {
    // Destructuring request object to get the body
    const { body } = request;

    // Create inputDto obj to verify
    const inputDto = {
      ...body,
      requestId: request.requestId,
    };
    // Destructuring body to get the user data
    const { userName, password } = body;
    // If one field is missing
    if (!userName || !password) {
      throw new Error("missing fields");
    }

    try {
      // Execute domain sign up execute method with inputDto obj created before 
      //* Sign up controller class does not worry about how the sign up is, its only task is to return success or fail response
      const dataDto = await this.signup.execute(inputDto);

      // return success response using BaseController method 
      return this.ok(request, response, HTTP_STATUS_CREATED, dataDto);
    } catch (error) {
      // if failed, return fail response using BaseController method

      return this.fail(
        request,
        response,
        HTTP_STATUS_INTERNAL_SERVER_ERROR,
        error
      );
    }
  }
}
