import { Router } from "express";
import authRoutes from "./auth.route.js";
import productsRoutes from "./products.route.js";
import categoriesRoutes from "./categories.route.js";
import ordersRoutes from "./orders.route.js";

const router = Router();
router.use("/auth", authRoutes);
router.use("/categories", categoriesRoutes);
router.use("/products", productsRoutes);
router.use("/orders", ordersRoutes);

export default router;
