import { Button, Flex, Paper, Title, clsx, createStyles } from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DataTable } from "mantine-datatable";
import React, { useState } from "react";
import { TbCheck, TbPlus, TbX } from "react-icons/tb";
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

const OrderIndex = () => {
  const { data: response } = useQuery({
    queryKey: ["orders", "all"],
    queryFn: api.orders.getAll,
  });

  const [selected, setSelected] = useState(null);
  const queryClient = useQueryClient();

  const { classes } = useStyles();

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
              title: "Address 1",
            },
            // {
            //   accessor: "quantity",
            //   title: "Quantity",
            // },
            // {
            //   accessor: "price",
            //   title: "Price",
            // },
            {
              accessor: "contact",
              title: "Contact",
            },

            // {
            //   accessor: "status",
            //   title: "Status",
            //   render: (record) => {
            //     const Icon = record.status === "paid" ? TbCheck : TbX;
            //     return (
            //       <Icon
            //         className={clsx(classes.icon, {
            //           [classes.iconActive]: record.status === "paid",
            //           [classes.iconDraft]: record.status === "unpaid",
            //         })}
            //       />
            //     );
            //   },
            // },
          ]}
        />
      </Paper>
    </div>
  );
};

export default OrderIndex;
