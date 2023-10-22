//* Defines the user sign-up business logic

import { inject, injectable } from "inversify";
import { SYMBOLS } from "@example-api/config/symbols";
import { UseCase, UserRepository } from "@example-api/domain";
import { AuthService } from '../../common/auth/auth-service';

// Interface for sign up request user data
interface requestDto {
  requestId: string;
  userName: string;
  password: string;
}

// Interface for sign up return response
interface responseDto {
  userName: string;
}


/**
** Creates sign up use case using UseCase interface
*@param requestDto Parameter for the request
*@param responseDto Parameter for the response
*/
export type SignupUseCase = UseCase<requestDto, responseDto>;

@injectable()

//* Signup class implements SignupUseCase interface for implement execute method using requestDto and responseDto types
export class Signup implements SignupUseCase {
  // use user repository to implement user searching method
  private readonly userRepository: UserRepository;
  // use auth service to hash new password
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
  ** implementation of use case interface method to execute sign up use case
  *@param requestDto Parameter of requestDto type containing user data
  */
  public async execute(requestDto: requestDto): Promise<responseDto> {
    try {
            // destructuring requestDto obejct (user data) to get userName and password
      const { userName, password } = requestDto;
      console.log({ requestDto });
      // hash new password using auth service class method
      const hashPassword = this.authService.hashPassword(password);
      // create new user using user repository interface method
      await this.userRepository.create({
        userName,
        password: hashPassword,
      });

      // return of responseDto type of the new username
      return Promise.resolve({
        userName,
      });
    } catch (error) {
      throw new Error(error?.message);
    }
  }
}
