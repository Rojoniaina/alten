import { Request, Response, NextFunction } from "express";

function authorizeAdmin(req: Request, res: Response, next: NextFunction) {
  // @ts-ignore
  if (req.user && req.user.email === "admin@admin.com") {
    next();
  } else {
    res
      .status(403)
      .json({ error: "Forbidden: Only admin can perform this action" });
  }
}

export default authorizeAdmin;
