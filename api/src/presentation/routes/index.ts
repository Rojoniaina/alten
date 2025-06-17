import { Router } from "express";
import productsRoutes from "./products.routes";
import authRoutes from "./auth.routes";
import authenticateJWT from "../middleware/auth.middleware";
import authorizeAdmin from "../middleware/admin.middleware";

const router = Router();

router.use("/", authRoutes);

router.use("/products", authenticateJWT, authorizeAdmin, productsRoutes);

export default router;
