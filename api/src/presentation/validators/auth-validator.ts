import { emailRegex } from "../../utils/formater";

export const authSchema = {
  type: "object",
  required: ["email", "password"],
  properties: {
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
