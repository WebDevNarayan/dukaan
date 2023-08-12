import { Flex, Paper, Title, createStyles } from "@mantine/core";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DataTable } from "mantine-datatable";
import React, { useState } from "react";
import { api } from "../../../utils/api";

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

const OrderIndex = () => {
  const { data: response } = useQuery({
    queryKey: ["orders", "all"],
    queryFn: api.orders.getAll,
  });

  console.log("Response data:", response?.data);

  return (
    <div>
      <Flex justify="space-between" align="center">
        <Title order={3}>Orders</Title>
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
              accessor: "country",
              title: "Country",
            },
            {
              accessor: "state",
              title: "State",
            },

            {
              accessor: "address1",
              title: "Address",
            },
            {
              accessor: "product",
              title: "Product",
            },
            {
              accessor: "quantity",
              title: "Quantity",
            },
            {
              accessor: "price",
              title: "Price",
            },
            {
              accessor: "contact",
              title: "Contact",
            },
          ]}
        />
      </Paper>
    </div>
  );
};

export default OrderIndex;
