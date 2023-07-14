import {
  Container,
  MediaQuery,
  Paper,
  SimpleGrid,
  TextInput,
  Title,
  createStyles,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import Product from "../components/Product.jsx";
import { api } from "../utils/api.js";
import { TbSearch } from "react-icons/tb";
import { useState } from "react";

const useStyles = createStyles(() => ({
  form: {
    border: "1px solid black",
    margin: "5px 0px 10px 0px",
    width: "360px",
  },
  cate: {
    cursor: "pointer",
  },
  img: {
    objectFit: "cover",
  },
}));
const LandingPage = () => {
  const { classes } = useStyles();
  const { data: response } = useQuery({
    queryKey: ["products", "all"],
    queryFn: api.products.getAll,
  });
  const { data: res } = useQuery({
    queryKey: ["categories", "all"],
    queryFn: api.categories.getAll,
  });
  const [search, setSearch] = useState("");
  console.log(search);

  return (
    <div className="">
      <Container size="xl" mt="sm" w="85%">
        <Title mb="xs" size="lg">
          Categories
        </Title>

        <SimpleGrid
          mx="auto"
          cols={8}
          breakpoints={[
            { maxWidth: "md", cols: 3, spacing: "md" },
            { maxWidth: "sm", cols: 2, spacing: "sm" },
            { maxWidth: "xs", cols: 1, spacing: "sm" },
          ]}
        >
          {res?.data?.categories?.map((category, index) => (
            <Paper withBorder radius="sm">
              <div className={classes.cate}>
                <div>
                  <img
                    className={classes.img}
                    src={category.image}
                    alt=""
                    height={120}
                    width="100%"
                  />
                </div>
                {category.title}
              </div>
            </Paper>
          ))}
        </SimpleGrid>
      </Container>
      <Container size="xl" mt="xl" w="85%">
        <Title mb="sm" size="md">
          Products
        </Title>

        <form className={classes.form}>
          <TextInput
            icon={<TbSearch />}
            placeholder="Search products"
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        <SimpleGrid
          cols={4}
          breakpoints={[
            { maxWidth: "md", cols: 3, spacing: "md" },
            { maxWidth: "sm", cols: 2, spacing: "sm" },
            { maxWidth: "xs", cols: 1, spacing: "sm" },
          ]}
        >
          {response?.data?.products
            ?.filter((product) => {
              return search.toLowerCase() === ""
                ? product
                : product.name.toLowerCase().includes(search);
            })
            .map((product, index) => (
              <Product key={`product-${index}`} product={product} />
            ))}
        </SimpleGrid>
      </Container>
    </div>
  );
};
export default LandingPage;
