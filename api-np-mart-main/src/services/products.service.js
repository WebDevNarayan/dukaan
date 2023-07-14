import Product from "../models/Product.js"

const getAll = () => {
  return Product.find()
    .populate("category")
    .sort({
      createdAt: -1,
    })
    .exec()
}

const get = (id) => {
  return Product.findById(id).populate("category").exec()
}

const create = ({ ...data }) => {
  const product = new Product(data)

  return product.save()
}

const update = async (id, data) => {
  return await Product.findByIdAndUpdate(id, data)
}

const remove = (id) => {
  return Product.findByIdAndDelete(id)
}

const ProductService = {
  getAll,
  get,
  create,
  update,
  remove,
}

export default ProductService
