import {
  Button,
  Group,
  Image,
  Modal,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { forwardRef, useMemo } from "react";
import { toast } from "react-hot-toast";
import { categorySchema } from "../../Schemas/categorySchema";
import { api } from "../../utils/api";

const CategoryForm = ({ opened, setOpened, categories, category }) => {
  const onClose = () => setOpened(false);
  const formattedCategories = useMemo(() => {
    return (
      categories &&
      categories.map((category) => ({
        label: category.title,
        value: category._id,
        parent: category.parent,
        image: category.image,
      }))
    )
  },[categories]);

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
            {parent && `${parent.title}`} {label}
          </Text>
        </Group>
      </div>
    )
  );

  const mutationFn = category ? api.categories.update : api.categories.create;
  const queryClient = useQueryClient();

  const categoryMutation = useMutation({
    mutationFn,
    onSuccess: () => {
      onClose()
      form.reset()
      toast.success("Category saved");
      queryClient.refetchQueries(["categories", "all"]);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const form = useForm({
    initialValues: {
      title: category?.title || "",
      parent: (category?.parent && category.parent._id) || "",
      image: category?.image || "",
    },
    validate: zodResolver(categorySchema),
  });

  const handleSubmit = (values) => {
    let data = {
      ...values,
      id: category?._id,
    };
    categoryMutation.mutate(data);
  };

  return (
    <Modal
      title={`${category ? "Update" : "Create"} Category`}
      opened={opened}
      onClose={onClose}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            {...form.getInputProps("title")}
            label="Title"
            placeholder="Title"
          />
          <Select
            clearable
            searchable
            itemComponent={categorySelectItem}
            label="parent category"
            placeholder="Parent Category"
            {...form.getInputProps("parent")}
            data={formattedCategories}
          />
          <TextInput
            label="Image"
            placeholder="Image"
            {...form.getInputProps("image")}
          />

          <Button type="submit" loading={categoryMutation.isLoading}>
            Submit
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};
export default CategoryForm;
