import OrderService from '../services/order.service.js';

const create = async (req, res) => {
  console.log(req.body);
  const order = await OrderService.create({ ...req.body, user: req.user.id });

  return res.status(201).json(order);
};
const getAll = async (req, res) => {
  const orders = await OrderService.getAll();
  return res.status(200).json(orders);
};

const getMyOrders = async (req, res) => {
  const orders = await OrderService.getMyOrders(req.user.id);

  return res.status(200).json(orders);
};

const cancelOrder = async (req, res) => {
  await OrderService.cancelOrder(req.params.id);

  return res.status(200).json({
    message: 'Order Cancelled Successfully',
  });
};

const OrderController = {
  create,
  getAll,
  getMyOrders,
  cancelOrder,
};

export default OrderController;
