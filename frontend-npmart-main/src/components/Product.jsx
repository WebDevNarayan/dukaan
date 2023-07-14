import { Carousel } from "@mantine/carousel";
import {
  Button,
  Group,
  HoverCard,
  Image,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import { useCart } from "@react-providers/cart";
import { Link } from "react-router-dom";
import { QuantityInput } from "./QuantityInput";

const Product = ({ product }) => {
  const { cart, addCart } = useCart();

  // console.log(cart);
  return (
    <HoverCard shadow="xl">
      <HoverCard.Target>
        <Paper withBorder radius="sm" key={product.id}>
          <Carousel
            sx={{ maxWidth: 350 }}
            mx="auto"
            withIndicators
            height={200}
          >
            {product.media.map((media, index) => {
              return (
                <Carousel.Slide key={`${product.id}-media-${index}`}>
                  <Image
                    radius="sm"
                    height={200}
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
          <Paper p="sm">
            {/* {data.filter((product) => {
              return search.toLowerCase() === ""
                ? product
                : product.title.toLowerCase().includes(search);
            })} */}
            <Title
              size="xl"
              my="sm"
              order={2}
              truncate
              component={Link}
              to={`/${product._id}/products`}
            >
              {product.name}
            </Title>
            <Group>
              <Text size="md" fw="600">
                Rs. {product.price}
              </Text>
              <Text strikethrough>Rs. {product.crossedPrice}</Text>
            </Group>

            {cart.cartItems.find((cart) => {
              return cart.product.variantId === product._id;
            }) ? (
              <QuantityInput product={product} />
            ) : (
              <Button
                onClick={() => {
                  addCart({
                    ...product,
                    variantId: product._id,
                  });
                }}
              >
                Add to Cart
              </Button>
            )}

            {/* <QuantityInput /> */}
          </Paper>
        </Paper>
      </HoverCard.Target>
      <HoverCard.Dropdown>
        <Text size="sm">New Arrival</Text>
      </HoverCard.Dropdown>
    </HoverCard>
  );
};
export default Product;
