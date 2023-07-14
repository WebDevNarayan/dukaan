import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    price: Number,
  },
  {
    timestamps: true,
  }
);

const OrderItem = mongoose.model('Orders', orderItemSchema);

export default OrderItem;