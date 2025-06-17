import { AuthInput, User, UserInput } from "../models/user";

export interface UserRepository {
  create(data: UserInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}
