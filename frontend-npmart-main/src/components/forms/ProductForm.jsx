import {
  ActionIcon,
  Button,
  Flex,
  Group,
  Image,
  Input,
  NumberInput,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { forwardRef, useMemo, useRef } from "react";
import { toast } from "react-hot-toast";
import { TbArrowBack, TbPlus, TbX } from "react-icons/tb";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Link, useNavigate } from "react-router-dom";
import { ProductSchema } from "../../schemas/ProductSchema";
import { api } from "../../utils/api";

const ProductForm = ({ product, categories }) => {
  const ref = useRef(null);

  const formattedCategories = useMemo(() => {
    return (
      categories &&
      categories.map((category) => ({
        label: category.title,
        value: category._id,
        parent: category.parent,
        image: category.image,
      }))
    );
  }, [categories]);

  const categorySelectItem = forwardRef(
    ({ label, image, parent, ...others }, ref) => (
      <div ref={ref} {...others}>
        <Group noWrap>
          <Image
            radius="sm"
            withPlaceholder
            src={image}
            height={50}
            width={50}
          />
          <Text>
            {parent && `${parent.title} >`} {label}
          </Text>
        </Group>
      </div>
    )
  );

  const form = useForm({
    initialValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || 0,
      crossedPrice: product?.crossedPrice || 0,
      costPrice: product?.costPrice || 0,
      tags: product?.tags ? product.tags.join(", ") : "",
      status: product?.status || "active",
      category: product?.category?._id || "",
      media: [...(product?.media || [""])],
    },
    validate: zodResolver(ProductSchema),
  });

  const mediaFields = form.values.media.map((media, index) => (
    <Flex key={index} gap="sm">
      <TextInput
        placeholder="https://unsplash.com/..."
        withAsterisk
        sx={{ flex: 1 }}
        {...form.getInputProps(`media.${index}`)}
      />
      <ActionIcon
        onClick={() => {
          form.removeListItem("media", index);
        }}
        color="red"
      >
        <TbX />
      </ActionIcon>
    </Flex>
  ));

  const mutationFn = product ? api.products.update : api.products.create;
  const navigate = useNavigate();
  const submitMutation = useMutation({
    mutationFn,
    onSuccess: () => {
      toast.success("Submitted");
      navigate("/dashboard/products");
    },
    onError: (error) => {
      toast.error("Error occurred");
      console.log(error);
    },
  });

  const handleSubmit = (values) => {
    console.log(values);
    const submitValues = {
      ...values,
      id: product?._id,
      tags: values.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0),
    };
    submitMutation.mutate(submitValues);
  };

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    [{ header: 1 }, { header: 2 }], // custom button values
    // [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    // [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    // [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    // [{ font: [] }],
    // [{ align: [] }],

    ["clean"],
  ];

  return (
    <form ref={ref} onSubmit={form.onSubmit(handleSubmit)}>
      <Flex justify="space-between" mb="sm" align="center">
        <Title order={3}>{product ? "Update" : "Create"} Product</Title>
        <Group>
          <Button
            variant="subtle"
            component={Link}
            to="/dashboard/products"
            leftIcon={<TbArrowBack />}
          >
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </Group>
      </Flex>

      <div>
        <SimpleGrid cols={3}>
          <div
            style={{
              gridColumn: "1 / 3",
            }}
          >
            <Paper withBorder p="md">
              <Stack>
                <TextInput
                  {...form.getInputProps("name")}
                  label="Name"
                  placeholder="Product Name"
                />
                <Input.Wrapper
                  label="Description"
                  error={form.errors.description}
                >
                  <ReactQuill
                    {...form.getInputProps("description")}
                    modules={{
                      toolbar: toolbarOptions,
                    }}
                    placeholder="Product Description"
                  />
                </Input.Wrapper>
                <Flex gap="sm">
                  <NumberInput
                    {...form.getInputProps("price")}
                    label="Price"
                    placeholder="Product Price"
                  />
                  <NumberInput
                    {...form.getInputProps("crossedPrice")}
                    label="Crossed Price"
                    placeholder="Crossed Price"
                  />
                </Flex>

                <NumberInput
                  {...form.getInputProps("costPrice")}
                  label="Cost Price"
                  placeholder="Cost Price"
                />

                <div>
                  <Text>Media</Text>
                  <Stack spacing="xs">{mediaFields}</Stack>
                  <ActionIcon
                    onClick={() => {
                      form.insertListItem("media", "");
                    }}
                    mt="xs"
                  >
                    <TbPlus />
                  </ActionIcon>
                </div>
              </Stack>
            </Paper>
          </div>
          <Stack>
            <Paper withBorder p="md">
              <Select
                label="Product Status"
                defaultValue="active"
                {...form.getInputProps("status")}
                data={[
                  {
                    label: "Active",
                    value: "active",
                  },
                  {
                    label: "Draft",
                    value: "draft",
                  },
                ]}
              />
            </Paper>
            <Paper withBorder p="md">
              <Select
                clearable
                searchable
                itemComponent={categorySelectItem}
                label="Category"
                {...form.getInputProps("category")}
                placeholder="Category"
                data={formattedCategories}
              />
            </Paper>
            <Paper withBorder p="md">
              <TextInput
                label="Tags"
                {...form.getInputProps("tags")}
                placeholder="Tags"
              />
              <Text c="dimmed" size="xs" mt={1}>
                Use comma(,) to seperate tags.
              </Text>
            </Paper>
          </Stack>
        </SimpleGrid>
      </div>
    </form>
  );
};
export default ProductForm;
