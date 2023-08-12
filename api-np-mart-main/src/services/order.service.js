import Order from '../models/Order.js';
import OrderItem from '../models/OrderItem.js';
import { khalti } from '../utils/khalti.js';

const getAll = () => {
  return Order.find();
};

const create = async (data) => {
  const order = await Order.create(data);
  const orderItems = data.items.map((item) => {
    OrderItem.create({
      order: order._id,
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price,
    });
  });
  return order;
};

const getMyOrders = async (userId) => {
  // All Orders That Has Been Placed By The User
  const orders = await Order.find({
    user: Object(`${userId}`),
  });

  // All The Ordered Items
  const orderItems = await Promise.all(
    orders.map(async (item) => {
      return await OrderItem.find({
        order: item._id.toString(),
      }).populate('product');
    })
  );
  const allOrderItems = [].concat(...orderItems);

  return allOrderItems;
};

const cancelOrder = async (orderId) => {
  const deletedOrder = await Order.findByIdAndDelete(orderId);

  return deletedOrder;
};

const OrderService = {
  getAll,
  create,
  getMyOrders,
  cancelOrder,
};

export default OrderService;
