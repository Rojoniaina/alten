import { Router } from "express";
import { validateData } from "../middleware/validation-error";
import { productSchema } from "../validators/product-validator";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller";

const router = Router();

router.get("/", getProducts);

router.get("/:id", getProduct);

router.post("/", validateData(productSchema), addProduct);

router.patch("/:id", validateData(productSchema), updateProduct);

router.delete("/:id", deleteProduct);

export default router;
