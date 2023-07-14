import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import { khalti } from "../utils/khalti.js";

const getAll = () => {
  return Order.find();
};

const create = async (data) => {
  const order = await Order.create(data);
  const items = data.items;
  data.items.map((item) => {
    const orderItem = OrderItem.create({
      order: order._id,
      product: item.product._id,
      price: item.product.price,
    });
  });

  try {
    const res = await khalti.post("epayment/initiate", {
      return_url: "http://127.0.0.1:5173/checkout",
      website_url: "http://127.0.0.1:5174/",
      amount: 10000,
      purchase_order_id: "1934",
      purchase_order_name: "Shoe",
    });

    console.log(res);
  } catch (err) {
    console.log(err.message);
  }

  return order;
};

const OrderService = {
  getAll,
  create,
};

export default OrderService;
