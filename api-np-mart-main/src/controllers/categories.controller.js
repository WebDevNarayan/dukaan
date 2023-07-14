import CategoriesService from "../services/categories.service.js"

const create = async (req, res) => {
  try {
    const { title, parent, image } = req.body
    const category = await CategoriesService.create({ title, parent, image })
    res.status(201).json({
      data: category,
    })
  } catch (e) {
    res.status(500).json({
      message: e.message || "Something went wrong",
    })
  }
}
const getAll = async (req, res) => {
  try {
    const categories = await CategoriesService.getAll()
    res.status(200).json({
      categories,
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
    const category = await CategoriesService.get(id)
    if (!category)
      return res.status(404).json({
        message: "Category not found",
      })
    return res.status(200).json({
      data: category,
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
    const category = await CategoriesService.update(id, req.body)
    if (!category)
      return res.status(404).json({
        message: "Category not found",
      })
    return res.status(200).json({
      data: category,
    })
  } catch (e) {
    return res.status(500).json({
      message: e.message || "Something went wrong",
    })
  }
}
const remove = async (req, res) => {
  try {
    const { id } = req.params
    const category = await CategoriesService.remove(id)
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      })
    }
    return res.status(200).json({
      data: category,
      message: "Category deleted successfully",
    })
  } catch (e) {
    return res.status(500).json({
      message: e.message || "Something went wrong",
    })
  }
}

const CategoriesController = {
  create,
  getAll,
  get,
  update,
  remove,
}

export default CategoriesController
