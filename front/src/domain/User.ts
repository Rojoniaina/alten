export interface User {
  id: string;
  username: string;
  firstname: string;
  email: string;
  password: string;
  createdAt: number;
  updatedAt: number;
}

export type CreateUserInput = Partial<
  Omit<User, "id" | "createdAt" | "updatedAt">
>;

export type AuthPayload = Partial<Pick<User, "email" | "password">>;
