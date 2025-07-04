import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }
      // @ts-ignore
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}

export default authenticateJWT;
