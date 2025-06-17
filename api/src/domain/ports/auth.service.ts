import { UserToken } from "../models/user";

export interface AuthService {
  generateToken(payload: UserToken): string;
  comparePassword(password: string, passwordHashed: string): Promise<boolean>;
}
