import {
  Button,
  Container,
  createStyles,
  Group,
  Paper,
  SimpleGrid,
  Title,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { api } from "../utils/api";

const useStyles = createStyles((theme) => ({
  button: {
    backgroundColor: "purple",
  },
}));

const PaymentPage = () => {
  const { classes } = useStyles();

  const { id } = useParams();

  const { data: response, isLoading } = useQuery({
    queryKey: ["products", "single", id],
    queryFn: async () => await api.products.getOne({ id }),
  });

  const product = response?.data.product;

  return (
    <>
      {response && !isLoading && (
        <Paper>
          <Title>PaymentPage</Title>
          {/* {response && !isLoading && ( */}
          <Container size="xl" mt="xl" mx="auto">
            <SimpleGrid cols={2} size="xl">
              <Button className={classes.button}>Via Khalti</Button>

              <Paper p="sm" withBorder shadow={10}>
                <Group>
                  <Text size="xl" fw="600">
                    Rs. {product.price}
                  </Text>

                  <Text>
                    <strong>Total:</strong> Rs. {cart.totalPrice}
                  </Text>
                </Group>
              </Paper>
            </SimpleGrid>
          </Container>
          {/* )} */}
        </Paper>
      )}
    </>
  );
};
export default PaymentPage;
