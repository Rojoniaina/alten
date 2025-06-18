import { useMutation } from "@tanstack/react-query";
import type { CreateUserInput, User } from "../../domain/User";
import { createUser } from "../../data/api/authApi";

export function useCreateUser() {
  return useMutation<User, Error & { status?: number }, CreateUserInput>({
    mutationFn: createUser,
  });
}
