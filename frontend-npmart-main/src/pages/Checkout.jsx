import {
  Button,
  Container,
  createStyles,
  Modal,
  Paper,
  SimpleGrid,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useCart } from "@react-providers/cart";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { orderSchema } from "../Schemas/orderSchema";
import { api } from "../utils/api";
import { useState } from "react";
// import Payment from "./Payment";

const useStyles = createStyles({
  form: {
    gridColumn: "1/3",
    "& > *": {
      marginBottom: 5,
    },
  },
});

const CheckoutPage = () => {
  const [opened, setOpened] = useState(false);

  const { classes } = useStyles();

  const { cart } = useCart();
  console.log(cart);

  const navigate = useNavigate();

  const orderMutation = useMutation({
    mutationFn: api.orders.create,
    onSuccess: () => {
      toast.success("Your Orders Have Been Placed!!!");
    },
    onError: (e) => {
      toast.error("Error Placing Your Order.");
    },
  });

  const form = useForm({
    initialValues: {
      name: "",
      address1: "",
      contact: "",
      country: "",
      state: "",
      city: "",
      zip: "",
    },
    validate: zodResolver(orderSchema),
  });

  const handleSubmit = (values) => {
    const submitValues = {
      ...values,
      items: cart.cartItems,
    };
    orderMutation.mutate(submitValues);
  };

  return (
    <Container size="xl" mt="md" w="85%">
      <SimpleGrid cols={3}>
        <form className={classes.form} onSubmit={form.onSubmit(handleSubmit)}>
          <Title>Checkout</Title>
          <TextInput
            label="Name"
            placeholder=""
            {...form.getInputProps("name")}
          />
          <TextInput
            label="Country"
            placeholder=""
            {...form.getInputProps("country")}
          />
          <TextInput
            label="State"
            placeholder=""
            {...form.getInputProps("state")}
          />
          <TextInput
            label="City"
            placeholder=""
            {...form.getInputProps("city")}
          />
          <TextInput
            label="Zip"
            placeholder=""
            {...form.getInputProps("zip")}
          />
          <TextInput
            label="Address"
            placeholder=""
            {...form.getInputProps("address1")}
          />
          <TextInput
            label="Contact"
            placeholder=""
            {...form.getInputProps("contact")}
          />
          <Button type="submit">Order</Button>
        </form>

        <Paper withBorder p="md">
          <Title order={4}>Order Summary</Title>
          <Text>Total: {cart.totalPrice}</Text>
        </Paper>
      </SimpleGrid>
      {/* <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        withCloseButton={false}
      >
        <Payment />
        <form action="https://uat.esewa.com.np/epay/main" method="POST">
          <input
            value={
              cart.totalPrice +
              cart.totalPrice * 0.13 +
              cart.totalPrice * 0.1 +
              100
            }
            name="tAmt"
            type="hidden"
          />
          <input value={cart.totalPrice} name="amt" type="hidden" />
          <input value={cart.totalPrice * 0.13} name="txAmt" type="hidden" />
          <input value={cart.totalPrice * 0.1} name="psc" type="hidden" />
          <input value="100" name="pdc" type="hidden" />
          <input value="EPAYTEST" name="scd" type="hidden" />
          <input
            value="ee2c3ca1-696b-4cc5-a6be-2c40d929d453"
            name="pid"
            type="hidden"
          />
          <input
            value="http://merchant.com.np/page/esewa_payment_success?q=su"
            type="hidden"
            name="su"
          />
          <input value="http://localhost:5173/" type="hidden" name="fu" />
          <Group>
            <Text>Select Payment Method</Text>
            <Flex>
              <Button
                type="submit"
                style={{
                  backgroundColor: "green",
                }}
              >
                Pay with Esewa
              </Button>
              <Button
                ml="md"
                onClick={() => {
                  toast.success(`Cash On Delivery Selected! Thank You! 
                  Continue Shopping`);
                  setOpened(false);
                  navigate("/");
                }}
              >
                Cash On Delivery
              </Button>
            </Flex>
          </Group>
        </form>
      </Modal> */}
    </Container>
  );
};
export default CheckoutPage;
