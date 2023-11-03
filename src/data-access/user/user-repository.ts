//* Implementation of user-repository using SQL queries

import { injectable } from "inversify";
import { sql } from "@example-api/config/db";
import { UserRepository } from "@example-api/domain";
import { User } from "src/domain/user/user";

@injectable()
export class UserRepositoryImpl implements UserRepository {

  // create a new user
  async create(data: User): Promise<void> {
    // data destructuring to get username and password
    const { userName, password } = data;
    await sql({
      query: `
        INSERT INTO
          user_account(usr_act_name, usr_act_password)
        VALUES($1,$2)
      `,
      // query parameters
      bind: [userName, password],
    });
  }

  // get user username
  async getUserByUserName(userName: string): Promise<any> {
    const results = await sql({
      query: `
        SELECT
          usr_act_id as "userId",
          usr_act_name as "userName",
          usr_act_password as password
        FROM user_account
        where usr_act_name = $1
      `,
      // query parameter
      bind: [userName],
    }) as any;

    // if user exists return user
    if (results.rowCount) {
      return results.rows[0];
    }

    // otherwise return null
    return null;
  }
}
