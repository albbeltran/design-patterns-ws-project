//* Defines the user sign-in business logic

import { inject, injectable } from "inversify";
import { SYMBOLS } from "@example-api/config/symbols";
import { UseCase, UserRepository } from "@example-api/domain";
import { AuthService } from "../../common/auth/auth-service";

// Interface for sign in request user data
interface requestDto {
  requestId: string;
  userName: string;
  password: string;
}

// Interface for sign in return response
interface responseDto {
  token: string;
}

/**
** Creates sign in use case using UseCase interface
*@param requestDto Parameter for the request
*@param responseDto Parameter for the response
*/
export type SigninUseCase = UseCase<requestDto, responseDto>;

@injectable()

//* Signin class implements SigninUseCase interface for implement execute method using requestDto and responseDto types
export class Signin implements SigninUseCase {
  // use user repository to implement user creation method
  private readonly userRepository: UserRepository;
  // use auth service to authenticate user
  private readonly authService: AuthService;

  public constructor(
    @inject(SYMBOLS.UserRepository)
    userRepository: UserRepository,
    @inject(SYMBOLS.AuthService)
    authService: AuthService
  ) {
    this.userRepository = userRepository;
    this.authService = authService;
  }

  /**
  ** implementation of use case interface method to execute sign in use case
  *@param requestDto Parameter of requestDto type containing user data
  */
  public async execute(requestDto: requestDto): Promise<responseDto> {
    try {
      // destructuring requestDto obejct (user data) to get userName and password
      const { userName, password } = requestDto;
      // searching user implementing user repository interface method
      const user = await this.userRepository.getUserByUserName(userName);
      // checking attempt password using auth service class method
      await this.authService.matchPassword(password, user.password);
      // generate session token
      const generateToken = this.authService.generateToken(user);

      // return of responseDto type of the token generated
      return Promise.resolve({
        token: generateToken,
      });
    } catch (error) {
      throw new Error(error?.message);
    }
  }
}
