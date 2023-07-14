import Category from "../models/Category.js"

const getAll = () => {
  return Category.find()
  .populate("parent")
  .sort({
    createdAt:-1,
  })
    .exec()
  }

const get = (id) => {
  return Category.findById(id).populate("parent").exec()
}

const create = ({ title, parent, image }) => {
  const category = new Category({
    title,
    parent,
    image,
  })

  return category.save()
}

const update = async (id, data) => {
  const category = await Category.findById(id)
  if (!category) throw new Error("Category not found")
  if (data.title) category.title = data.title
  if (data.parent) category.parent = data.parent
  if (data.image) category.image = data.image
  return category.save()
}

const remove = (id) => {
  return Category.findByIdAndDelete(id)
}

const CategoriesService = {
  getAll,
  get,
  create,
  update,
  remove,
}

export default CategoriesService
