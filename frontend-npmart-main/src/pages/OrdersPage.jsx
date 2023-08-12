import {
  ActionIcon,
  Container,
  Flex,
  Group,
  Paper,
  Title,
} from '@mantine/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DataTable } from 'mantine-datatable';
import React, { useState } from 'react';
import { api } from '../utils/api';
import { TbX } from 'react-icons/tb';

const OrdersPage = () => {
  const { data: response } = useQuery({
    queryKey: ['myOrders', 'all'],
    queryFn: api.orders.myOrders,
  });

  const [selected, setSelected] = useState(null);
  const queryClient = useQueryClient();

  const cancelOrder = useMutation({
    mutationFn: api.orders.cancelOrder,
    onMutate: ({ id }) => {
      setSelected(id);
    },
    onSuccess: () => {
      toast.success('Order Cancelled');
      queryClient.refetchQueries(['myOrders', 'all']);
      setSelected(null);
    },
    onError: (e) => {
      toast.error('Error Cancelling Order');
      console.log(e);
    },
  });

  return (
    <Container size="xl" w="85%">
      <Flex justify="space-between" align="center" mt="md">
        <Title>My Orders</Title>
      </Flex>
      <Paper mt="sm" w={1200}>
        <DataTable
          withBorder
          records={response?.data}
          mih={120}
          maw={1200}
          columns={[
            {
              accessor: 'product.name',
              title: 'Product Name',
            },
            {
              accessor: 'quantity',
              title: 'Quantity',
            },
            {
              accessor: 'price',
              title: 'Price',
            },
            {
              accessor: 'actions',
              title: 'Actions',
              render: (record) => (
                <Group>
                  <ActionIcon
                    onClick={() => {
                      cancelOrder.mutate({ id: record._id });
                    }}
                    loading={cancelOrder.isLoading && selected === record._id}
                    color="red"
                  >
                    <TbX />
                  </ActionIcon>
                </Group>
              ),
            },
          ]}
        />
      </Paper>
    </Container>
  );
};

export default OrdersPage;
