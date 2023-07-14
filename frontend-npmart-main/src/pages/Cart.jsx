import {
  Box,
  Button,
  Container,
  Flex,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import { useCart } from "@react-providers/cart";
import { DataTable } from "mantine-datatable";
import { Link } from "react-router-dom";
import { QuantityInput } from "../components/QuantityInput";
import useUser from "../hooks/useUser.js";

const CartPage = () => {
  const { cart } = useCart();
  const { user } = useUser();
  return (
    <Container size="xl" w="85%">
      <Flex justify="space-between" align="center" mt="md">
        <Title order={3}>Your Cart</Title>
        {/* <Button onClick={() => cart.cartItems.} variant='subtle' color='red'>
          Clear Cart
        </Button> */}
      </Flex>

      <Paper>
        <DataTable
          columns={[
            {
              accessor: "product.name",
              title: "Product",
              render: (cartItem) => (
                <Box
                  style={{
                    width: 150,
                  }}
                >
                  <Text truncate>{cartItem.product.name}</Text>
                </Box>
              ),
            },
            {
              accessor: "product.price",
              title: "Price",
            },
            {
              accessor: "quantity",
              title: "Quantity",
              render: (cartItem) => (
                <Box
                  style={{
                    width: 200,
                  }}
                >
                  <QuantityInput product={cartItem.product} />
                </Box>
              ),
            },
            {
              accessor: "product.price",
              title: "Total",
              render: (cartItem) => (
                <Text truncate>
                  {cartItem.product.price * cartItem.quantity}
                </Text>
              ),
            },
          ]}
          records={cart.cartItems}
          mih={120}
          withColumnBorders
          withBorder
        />
        <Flex justify="flex-end" direction="column" align="flex-end" mt="md">
          <Text>
            <strong>Total:</strong> Rs. {cart.totalPrice}
          </Text>

          {user ? (
            <Button component={Link} to="/checkout">
              Checkout
            </Button>
          ) : (
            <Button component={Link} to="/auth/login">
              Login
            </Button>
          )}
        </Flex>
      </Paper>
    </Container>
  );
};
export default CartPage;
