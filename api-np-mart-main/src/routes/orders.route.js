import { Router } from "express";
import OrderController from "../controllers/order.controller.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.get("/", OrderController.getAll);
router.post("/", auth, OrderController.create);

export default router;
