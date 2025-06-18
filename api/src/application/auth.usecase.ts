import { InvalidCredentials } from "../domain/errors/InvalidCredentials";
import { UserNotFound } from "../domain/errors/userNotFound";
import { AuthInput } from "../domain/models/user";
import { AuthService } from "../domain/ports/auth.service";
import { UserRepository } from "../domain/ports/user.repository";

export class AuthUseCase {
  constructor(
    private readonly repository: UserRepository,
    private readonly service: AuthService
  ) {}

  async login(payload: AuthInput): Promise<string> {
    const user = await this.repository.findByEmail(payload.email);

    if (!user) {
      throw new UserNotFound(payload.email);
    }

    const isMatch = await this.service.comparePassword(
      payload.password,
      user.password
    );

    if (!isMatch) {
      throw new InvalidCredentials();
    }

    return this.service.generateToken({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  }
}
