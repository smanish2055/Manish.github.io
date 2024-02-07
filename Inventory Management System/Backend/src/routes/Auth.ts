import { Router } from "express";
import {
  login,
  register,
} from "../controllers/AuthController";
import { validateRequestBody } from "../middlewares/Validator";
import { userBodySchema, userLoginSchema } from "../validations/UserSchema";
const router = Router();

router.post("/login", validateRequestBody(userLoginSchema), login);
router.post("/register", validateRequestBody(userBodySchema), register);

export default router;














// router.post("/logout", logout);
// router.post("/refresh", refresh);
