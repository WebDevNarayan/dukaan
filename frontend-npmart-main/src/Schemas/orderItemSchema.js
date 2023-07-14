import { z } from 'zod';

export const orderItemSchema = z.object({
  orderID: z.string({
    required_error: 'Order ID is required.',
  }),
  productID: z.string({
    required_error: 'Product ID is required.',
  }),
});