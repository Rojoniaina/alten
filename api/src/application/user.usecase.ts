import { UserAlreadyExistsError } from "../domain/errors/userAlreadyExistsError";
import { AuthInput, User, UserInput } from "../domain/models/user";
import { UserRepository } from "../domain/ports/user.repository";

export class UserUseCase {
  constructor(private readonly repository: UserRepository) {}

  async createUser(data: UserInput): Promise<User> {
    const existing = await this.repository.findByEmail(data.email);

    if (existing) {
      throw new UserAlreadyExistsError(data.email);
    }

    return this.repository.create(data);
  }
}
