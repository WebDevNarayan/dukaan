import { Carousel } from "@mantine/carousel";
import {
  Button,
  Container,
  Group,
  Image,
  Paper,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { useCart } from "@react-providers/cart";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
// import { QuantityInput } from "../components/QuantityInput";
import { api } from "../utils/api";

const ProductDescriptionPage = () => {
  const { cart, addCart } = useCart();

  const { id } = useParams();

  const { data: response, isLoading } = useQuery({
    queryKey: ["products", "single", id],
    queryFn: async () => await api.products.getOne({ id }),
  });

  const product = response?.data.product;

  return (
    <>
      {response && !isLoading && (
        <Container size="xl" mt="xl" mx="auto">
          <SimpleGrid cols={2} size="xl">
            {/* <Paper withBorder radius="sm" key={product.id}> */}
            <Carousel
              sx={{ maxWidth: "full" }}
              mx="auto"
              withIndicators
              height={450}
            >
              {product.media.map((media, index) => {
                return (
                  <Carousel.Slide key={`${product.id}-media-${index}`}>
                    <Image
                      radius="sm"
                      height={450}
                      withPlaceholder
                      src={media}
                      component={Link}
                      to={`/${product._id}/products`}
                    />
                  </Carousel.Slide>
                );
              })}
              {/* ...other slides */}
            </Carousel>
            <Paper p="sm" withBorder shadow={10}>
              <Title my="sm" order={2} truncate>
                {product.name}
              </Title>
              <Group>
                <Text size="xl" fw="600">
                  Rs. {product.price}
                </Text>
                <Text strikethrough>Rs. {product.crossedPrice}</Text>
              </Group>
              <Title my="sm" size="sm" order={2}>
                Description: {product.description.replace(/[<p></p>]/g, "")}
              </Title>
              <Title my="sm" size="sm" order={2} truncate>
                Tags: {product.tags}
              </Title>
              <Title my="sm" size="sm" order={2} truncate>
                Status: {product.status}
              </Title>
            </Paper>

            {/* </Paper> */}
          </SimpleGrid>
        </Container>
      )}
    </>
  );
};

export default ProductDescriptionPage;
