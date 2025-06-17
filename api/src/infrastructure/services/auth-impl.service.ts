import jwt from "jsonwebtoken";
import { AuthService } from "../../domain/ports/auth.service";
import { UserToken } from "../../domain/models/user";
import bcrypt from "bcrypt";

export class AuthImplService implements AuthService {
  generateToken(payload: UserToken): string {
    console.log("xxxxxxJWT_SECRETxxxxxxx", process.env.JWT_SECRET);

    return jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
  }
  async comparePassword(
    password: string,
    passwordHashed: string
  ): Promise<boolean> {
    return bcrypt.compare(password, passwordHashed);
  }
}
