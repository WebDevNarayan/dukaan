import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: String,
    country: String,
    state: String,
    city: String,
    zip: String,
    address1: String,
    contact: String,
    paymentStatus: {
      type: String,
      enum: ["paid", "unpaid"],
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
