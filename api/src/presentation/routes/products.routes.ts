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
import authorizeAdmin from "../middleware/admin.middleware";

const router = Router();

router.get("/", getProducts);

router.get("/:id", getProduct);

router.post("/", authorizeAdmin, validateData(productSchema), addProduct);

router.patch(
  "/:id",
  authorizeAdmin,
  validateData(productSchema),
  updateProduct
);

router.delete("/:id", authorizeAdmin, deleteProduct);

export default router;
