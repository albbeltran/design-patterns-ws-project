//* Creates the repository interface to data persistence

import { User } from "./user";

export interface UserRepository {
  // returns nothing when creating a user
  create(data: User): Promise<void>;
  // returns username or nothing when searching a user
  getUserByUserName(userName: string): Promise<any>;
}
