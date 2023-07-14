import { Container, Flex, Paper } from "@mantine/core";
import { Link, Outlet } from "react-router-dom";
import { Black } from "../components/logo";

const AuthLayout = () => {
  return (
    <Container size="xs">
      <Flex direction="column" my="xl" align="center">
        <Link to="/">
          <Black />
        </Link>
        <Paper mt="sm" withBorder w="100%" p="xl">
          <Outlet />
        </Paper>
      </Flex>
    </Container>
  );
};
export default AuthLayout;
