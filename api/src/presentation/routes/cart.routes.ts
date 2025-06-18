import { Router } from "express";
import {
  addItemToCart,
  clearCart,
  getCart,
  getCartItemCount,
  removeCartItem,
  updateCartItem,
} from "../controllers/cart.controller";

const router = Router();

router.get("/", getCart);
router.get("/count", getCartItemCount);
router.post("/items", addItemToCart);
router.patch("/items", updateCartItem);
router.delete("/items/:productId", removeCartItem);
router.delete("/", clearCart);

export default router;
