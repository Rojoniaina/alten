import { Request, Response } from "express";
import { httpErrorSend } from "../../utils/errors";
import { userServiceCase } from "../../services/user.service";
import { UserAlreadyExistsError } from "../../domain/errors/userAlreadyExistsError";
import { authServiceCase } from "../../services/auth.service";
import { UserNotFound } from "../../domain/errors/userNotFound";
import { InvalidCredentials } from "../../domain/errors/InvalidCredentials";

export const createAccount = async (req: Request, res: Response) => {
  try {
    const user = await userServiceCase.createUser(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    if (error instanceof UserAlreadyExistsError) {
      httpErrorSend(res, {
        status: 409,
        error: "Conflict",
        message: error.message,
      });
      return;
    }
    httpErrorSend(res, { message: error?.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const token = await authServiceCase.login(req.body);
    res.status(200).json(token);
  } catch (error: any) {
    if (error instanceof UserNotFound) {
      httpErrorSend(res, {
        status: 404,
        error: "NotFound",
        message: error.message,
      });
      return;
    }
    if (error instanceof InvalidCredentials) {
      httpErrorSend(res, {
        status: 401,
        error: "Unauthorized",
        message: error.message,
      });
      return;
    }
    httpErrorSend(res, { message: error?.message });
  }
};
