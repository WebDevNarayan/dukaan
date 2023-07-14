/**
 * req : Request Object
 * res: Response Object
 * next: Next Function -> if everything is ok, we call next() to move to the next middleware
 */

import { z } from "zod"

/**
 * @param {z.ZodSchema} schema
 */
export const validate = (schema) => async (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    })
    next()
  } catch (e) {
    res.status(400).json({
      errors: e.errors,
      message: e.message || "Something went wrong",
    })
  }
}
