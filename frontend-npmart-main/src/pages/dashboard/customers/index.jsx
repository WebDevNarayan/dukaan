import { Button, Flex, Paper, Title, createStyles } from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DataTable } from "mantine-datatable";
import React, { useState } from "react";
import { TbPlus } from "react-icons/tb";
import { api } from "../../../utils/api";
import { Link } from "react-router-dom";

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
}));

const CustomerIndex = () => {
  const { data: response } = useQuery({
    queryKey: ["orders", "all"],
    queryFn: api.orders.getAll,
  });

  const [selected, setSelected] = useState(null);
  const queryClient = useQueryClient();

  // const deleteCustomer = useMutation({
  //   mutationFn: api.users.remove,
  //   onMutate: ({ id }) => {
  //     setSelected(id);
  //   },
  //   onSuccess: () => {
  //     toast.success("Customer deleted.");
  //     queryClient.refetchQueries(["users", "all"]);
  //     setSelected(null);
  //   },
  //   onError: (e) => {
  //     toast.error("Error deleting customer.");
  //     console.log(e);
  //   },
  // });
  const { classes } = useStyles();

  return (
    <div>
      <Flex justify="space-between" align="center">
        <Title order={3}>Customers</Title>
      </Flex>

      <Paper mt="sm">
        <DataTable
          withBorder
          records={response?.data}
          mih={120}
          columns={[
            {
              accessor: "name",
              title: "Name",
            },
            {
              accessor: "city",
              title: "City",
            },
            {
              accessor: "country",
              title: "Country",
            },
          ]}
        />
      </Paper>
    </div>
  );
};

export default CustomerIndex;
