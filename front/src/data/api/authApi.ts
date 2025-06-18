import { BASE_URL } from "../constant";
import { handlErrors } from "../utils";
import type { AuthPayload, CreateUserInput, User } from "../../domain/User";

const API_URL = `${BASE_URL}/api/v1`;

export const createUser = async (data: CreateUserInput): Promise<User> => {
  const response = await fetch(`${API_URL}/account`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  await handlErrors(response);

  return response.json();
};

export const login = async (data: AuthPayload): Promise<string> => {
  const response = await fetch(`${API_URL}/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  await handlErrors(response);

  return response.json();
};
