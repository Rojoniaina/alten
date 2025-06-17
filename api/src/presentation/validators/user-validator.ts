import { emailRegex } from "../../utils/formater";

export const userSchema = {
  type: "object",
  required: ["username", "firstname", "email", "password"],
  properties: {
    username: {
      type: "string",
      minLength: 1,
      errorMessage: {
        type: "Username must be string",
        minLength: "Username must have at least one character",
      },
    },
    firstname: {
      type: "string",
      minLength: 2,
      errorMessage: {
        type: "Firstname must be string",
        minLength: "Firstname must have at least 2 characters",
      },
    },
    email: {
      pattern: emailRegex,
      errorMessage: {
        pattern: "Invalid email format",
      },
    },
    password: {
      type: "string",
      minLength: 1,
      errorMessage: {
        type: "Password must be string",
        minLength: "Password must have at least one character",
      },
    },
  },
};
