import { UserUseCase } from "../application/user.usecase";
import { UserImplRepository } from "../infrastructure/repositories/user-impl.repository";

const userImplRepository = new UserImplRepository();
export const userServiceCase = new UserUseCase(userImplRepository);
