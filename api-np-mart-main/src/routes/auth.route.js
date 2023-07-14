import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import { auth } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "../schemas/auth.schema.js";

const router = Router();

router.get("/", async (req, res) => {
  return res.json({
    message: "Hello, world",
  });
});

router.post("/register", validate(registerSchema), AuthController.register);
router.post("/login", validate(loginSchema), AuthController.login);
router.get("/verify/:id/:token", auth, AuthController.verify);
router.post("/resend-verification", auth, AuthController.resendVerification);
router.get("/me", auth, AuthController.me);
router.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  AuthController.forgotPassword
);
router.post(
  "/reset",
  validate(resetPasswordSchema),
  AuthController.resetPassword
);

export default router;
