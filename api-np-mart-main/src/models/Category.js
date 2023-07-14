import mongoose from "mongoose"

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
)

const Category = mongoose.model("Category", categorySchema)

export default Category
