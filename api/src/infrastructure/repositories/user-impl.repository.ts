import { User, UserInput } from "../../domain/models/user";
import { UserRepository } from "../../domain/ports/user.repository";
import { UserModel } from "../database/models/user.model";

export class UserImplRepository implements UserRepository {
  async create(data: UserInput): Promise<User> {
    const User = new UserModel(data);
    await User.save();
    return User.toJSON();
  }

  async findByEmail(email: string): Promise<User | null> {
    return UserModel.findOne({ email }).exec();
  }
}
