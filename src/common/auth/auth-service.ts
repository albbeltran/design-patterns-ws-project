//* Implements AuthService interface to authenticate users

// using jwt package to create and manage JSON Web Token
import jwt from 'jsonwebtoken';
// using bcrypt package to hash passwords
import bcrypt from 'bcryptjs';

import { config } from "@example-api/platform/index";
import { IAuthService } from './AuthService';
import { injectable } from 'inversify';
@injectable()

//* AuthService class implements AuthService interface to implement authetication methods using jwt and bcrypt
export class AuthService implements IAuthService {
  // generate new JSON web token
  generateToken(data: any): any {
    return jwt.sign({ data }, config.auth.secret, {
      expiresIn: "24h",
    });
  }

  // verify existing JSON web token
  verifyToken(token: string): any {
    try {
      return jwt.verify(token, config.auth.secret);
    } catch (err) {
      return false;
    }
  }

  // compare attempt password with saved password
  async matchPassword(password, hash) {
    return await bcrypt.compare(password, hash);
  }

  // hash a new password
  hashPassword(plainPassword): string {
    const saltRounds = config.auth.salts;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(plainPassword, salt);

    return hash;
  }
}
