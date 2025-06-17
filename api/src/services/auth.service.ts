import { AuthUseCase } from "../application/auth.usecase";
import { UserUseCase } from "../application/user.usecase";
import { AuthImplService } from "../infrastructure/services/auth-impl.service";
import { UserImplRepository } from "../infrastructure/repositories/user-impl.repository";

const userImplRepository = new UserImplRepository();
const authImplService = new AuthImplService();

export const authServiceCase = new AuthUseCase(
  userImplRepository,
  authImplService
);
