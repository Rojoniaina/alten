export interface User {
  id: string;
  username: string;
  firstname: string;
  email: string;
  password: string;
  createdAt: number;
  updatedAt: number;
}

export type AuthInput = Pick<User, "email" | "password">;

export type UserInput = Pick<
  User,
  "username" | "firstname" | "email" | "password"
>;

export type UserToken = Pick<User, "id" | "email" | "username">;
