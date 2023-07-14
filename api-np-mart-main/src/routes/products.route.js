import { Router } from "express"
import ProductsController from "../controllers/products.controller.js"
import { auth } from "../middlewares/auth.js"
import { validate } from "../middlewares/validate.js"
import { ProductSchema } from "../schemas/products.schema.js"


const router = Router()

router.get("/", ProductsController.getAll)
router.get("/:id", ProductsController.get)
router.post(
  "/",
  auth,
  validate(ProductSchema),
  ProductsController.create
)
router.put(
  "/:id",
  auth,
  validate(ProductSchema),
  ProductsController.update
)
router.delete("/:id", auth, ProductsController.remove)

export default router