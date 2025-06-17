import { Router } from "express";
import { validateData } from "../middleware/validation-error";
import { createAccount, login } from "../controllers/auth.controller";
import { authSchema } from "../validators/auth-validator";
import { userSchema } from "../validators/user-validator";

const router = Router();

router.post("/account", validateData(userSchema), createAccount);
router.post("/token", validateData(authSchema), login);

export default router;
