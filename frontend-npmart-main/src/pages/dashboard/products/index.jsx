import {
  ActionIcon,
  Button,
  clsx,
  createStyles,
  Flex,
  Group,
  Paper,
  Title,
} from "@mantine/core"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { DataTable } from "mantine-datatable"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { TbCheck, TbPencil, TbPlus, TbTrash, TbX } from "react-icons/tb"
import { Link } from "react-router-dom"
import { api } from "../../../utils/api"

const useStyles = createStyles((theme) => ({
  icon: {
    fontSize: "20px",
    borderRadius: "50%",
    padding: "3px",
    width: "21px",
    color: "white",
    height: "21px",
  },
  iconActive: {
    backgroundColor: theme.colors.green[6],
  },
  iconDraft: {
    backgroundColor: theme.colors.red[6],
  },
}))

const ProductsIndex = () => {
  const { data: response } = useQuery({
    queryKey: ["products", "all"],
    queryFn: api.products.getAll,
  })

  const [selected, setSelected] = useState(null)
  const queryClient = useQueryClient()

  const deleteProduct = useMutation({
    mutationFn: api.products.remove,
    onMutate: ({ id }) => {
      setSelected(id)
    },
    onSuccess: () => {
      toast.success("Product deleted.")
      queryClient.refetchQueries(["products", "all"])
      setSelected(null)
    },
    onError: (e) => {
      toast.error("Error deleting product.")
      console.log(e)
    },
  })

  // console.log(response)
  const { classes } = useStyles()
  return (
    <div>
      <Flex justify='space-between' align='center'>
        <Title order={3}>Products</Title>
        <Button component={Link} to='create' leftIcon={<TbPlus />}>
          Create
        </Button>
      </Flex>

      <Paper mt='sm'>
        <DataTable
          withBorder
          records={response?.data?.products}
          mih={120}
          columns={[
            {
              accessor: "name",
              title: "Name",
            },
            {
              accessor: "price",
              title: "Price",
            },
            {
              accessor: "crossedPrice",
              title: "Crossed Price",
            },
            {
              accessor: "costPrice",
              title: "Cost Price",
            },
            {
              accessor: "status",
              title: "Status",
              render: (record) => {
                const Icon = record.status === "active" ? TbCheck : TbX
                return (
                  <Icon
                    className={clsx(classes.icon, {
                      [classes.iconActive]: record.status === "active",
                      [classes.iconDraft]: record.status === "draft",
                    })}
                  />
                )
              },
            },
            {
              accessor: "actions",
              title: "Actions",
              render: (record) => (
                <Group>
                  <ActionIcon
                    color='blue'
                    component={Link}
                    to={`${record._id}/edit`}
                  >
                    <TbPencil />
                  </ActionIcon>
                  <ActionIcon
                    onClick={() => {
                      deleteProduct.mutate({ id: record._id })
                    }}
                    loading={deleteProduct.isLoading && selected === record._id}
                    color='red'
                  >
                    <TbTrash />
                  </ActionIcon>
                </Group>
              ),
            },
          ]}
        />
      </Paper>
    </div>
  )
}
export default ProductsIndex
