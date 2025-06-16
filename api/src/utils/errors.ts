import { Response } from "express";

export const httpErrorSend = (
  res: Response,
  data?: {
    status?: number;
    error?: string;
    message?: string;
  }
) => {
  res.status(data?.status || 500).json({
    error: data?.error || "Internal server error",
    message: data?.message || "",
  });
};
