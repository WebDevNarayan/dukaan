import { Router } from "express"
import CategoriesController from "../controllers/categories.controller.js"
import { auth } from "../middlewares/auth.js"
import { validate } from "../middlewares/validate.js"
import {
  createCategorySchema,
  updateCategorySchema,
} from "../schemas/categories.schema.js"

const router = Router()

router.get("/", CategoriesController.getAll)
router.get("/:id", CategoriesController.get)
router.post(
  "/",
  auth,
  validate(createCategorySchema),
  CategoriesController.create
)
router.put(
  "/:id",
  auth,
  validate(updateCategorySchema),
  CategoriesController.update
)
router.delete("/:id", auth, CategoriesController.remove)

export default router
