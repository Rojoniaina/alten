import { Router } from "express";
import productsRoutes from "./products.routes";
import authRoutes from "./auth.routes";
import cartRoutes from "./cart.routes";
import authenticateJWT from "../middleware/auth.middleware";

const router = Router();

router.use("/", authRoutes);
router.use("/carts", authenticateJWT, cartRoutes);
router.use("/products", authenticateJWT, productsRoutes);

export default router;
