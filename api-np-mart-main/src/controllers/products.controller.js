import ProductService from "../services/products.service.js"

const create = async (req, res) => {
  try {
    const product = await ProductService.create(req.body)
    res.status(201).json({
      product,
    })
  } catch (e) {
    res.status(500).json({
      message: e.message || "Something went wrong",
    })
  }
}
const getAll = async (req, res) => {
  try {
    const products = await ProductService.getAll()
    res.status(200).json({
      products,
    })
  } catch (e) {
    res.status(500).json({
      message: e.message || "Something went wrong",
    })
  }
}
const get = async (req, res) => {
  try {
    const { id } = req.params
    const product = await ProductService.get(id)
    if (!product)
      return res.status(404).json({
        message: "Product not found",
      })
    return res.status(200).json({
      product,
    })
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      message: e.message || "Something went wrong",
    })
  }
}
const update = async (req, res) => {
  try {
    const { id } = req.params
    const product = await ProductService.update(id, req.body)
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      })
    }
    return res.status(200).json({
      product,
    })
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      message: e.message || "Something went wrong",
    })
  }
}
const remove = async (req, res) => {
  try {
    const { id } = req.params
    const product = await ProductService.remove(id)
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      })
    }
    return res.status(200).json({
      data: product,
      message: "Product deleted successfully",
    })
  } catch (e) {
    return res.status(500).json({
      message: e.message || "Something went wrong",
    })
  }
}

const ProductsController = {
  create,
  getAll,
  get,
  update,
  remove,
}

export default ProductsController
