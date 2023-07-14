import {
  ActionIcon,
  Button,
  Flex,
  Group,
  Image,
  Paper,
  Title,
} from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DataTable } from "mantine-datatable";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { TbEye, TbPencil, TbPlus, TbTrash } from "react-icons/tb";
import CategoryDrawer from "../../../components/drawers/CategoryDrawer";
import CategoryForm from "../../../components/forms/CategoryForm";
import { api } from "../../../utils/api";

const CategoriesIndex = () => {
  const [createOpened, setCreateOpened] = useState(false);

  const { data: response, isLoading } = useQuery({
    queryFn: api.categories.getAll,
    queryKey: ["categories", "all"],
  });

  console.log(response);

  const queryClient = useQueryClient();
  const [selected, setSelected] = useState(null);
  const [categoryToUpdate, setCategoryToUpdate] = useState(null);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [categoryToView, setCategoryToView] = useState(null);

  const deleteCategory = useMutation({
    mutationFn: api.categories.remove,
    onMutate: ({ id }) => {
      setSelected(id);
    },
    onSuccess: () => {
      toast.success("Category deleted");
      queryClient.refetchQueries(["categories", "all"]);
      setSelected(null);
    },
    onError: (e) => {
      toast.error("error deleting category");
      console.log(e);
    },
  });

  return (
    <div>
      <Flex justify="space-between" align="center">
        <Title order={3}>Categories</Title>
        <Button onClick={() => setCreateOpened(true)} leftIcon={<TbPlus />}>
          Create
        </Button>
      </Flex>

      <Paper withBorder shadow="sm" mt="md">
        <DataTable
          withColumnBorders
          mih={120}
          records={response?.data?.categories}
          columns={[
            {
              accessor: "title",
              title: "Title",
            },
            {
              accessor: "parent.title",
              title: "Parent Category",
            },
            {
              accessor: "image",
              title: "Image",
              render: (category) => (
                <Image
                  radius="sm"
                  withPlaceholder //dommy image
                  src={category.image}
                  height={50}
                  width={50}
                />
              ),
            },
            {
              accessor: "actions",
              title: "Actions",
              render: (category) => (
                <Flex>
                  <ActionIcon
                    onClick={() => {
                      deleteCategory.mutate({ id: category._id });
                    }}
                    loading={
                      deleteCategory.isLoading && selected === category._id
                    }
                    color="red"
                  >
                    <TbTrash />
                  </ActionIcon>
                  <ActionIcon
                    onClick={() => {
                      setCategoryToUpdate(category);
                      setOpenUpdateModal(true);
                    }}
                    color="blue"
                  >
                    <TbPencil />
                  </ActionIcon>
                  <ActionIcon
                    onClick={() => {
                      setCategoryToView(category);
                      setOpenViewModal(true);
                    }}
                    color="green"
                  >
                    <TbEye />
                  </ActionIcon>
                </Flex>
              ),
            },
          ]}
        />
      </Paper>

      {categoryToUpdate && openUpdateModal && (
        <CategoryForm
          categories={response?.data?.categories}
          category={categoryToUpdate}
          opened={openUpdateModal}
          setOpened={setOpenUpdateModal}
        />
      )}

      <CategoryForm
        categories={response?.data?.categories}
        opened={createOpened}
        setOpened={setCreateOpened}
      />

      {categoryToView && openViewModal && (
        <CategoryDrawer
          category={categoryToView}
          opened={openViewModal}
          setOpened={setOpenViewModal}
        />
      )}
    </div>
  );
};
export default CategoriesIndex;
