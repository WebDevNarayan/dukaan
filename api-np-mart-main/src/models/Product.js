import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: String,
    description: String,
    price: Number,
    crossedPrice: Number,
    costPrice: Number,
    slug: {
      type: String,
      unique: true,
    },
    status: String,
    productStatus: String,
    media: [String],
    tags: [String],
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  {
    timestamps: true,
  }
);

productSchema.pre("save", async function (next) {
  const slug = this.name.toLowerCase().replace(/ /g, "-");
  const usedSlugsList = await this.constructor.distinct("slug", {
    slug: {
      $regex: `^${this.slug}`,
      $options: "i",
    },
  });
  if (usedSlugsList) {
    this.slug = `${slug}-${usedSlugsList.length + 1}`;
  } else {
    this.slug = slug;
  }
  next();
});

const Product = mongoose.model("Product", productSchema);

export default Product;
