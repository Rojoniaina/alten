import { useMutation } from "@tanstack/react-query";
import type { AuthPayload } from "../../domain/User";
import { login } from "../../data/api/authApi";

export function useLogin() {
  return useMutation<string, Error & { status?: number }, AuthPayload>({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("token", data);
    },
  });
}
