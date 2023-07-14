import { Text, Title } from "@mantine/core";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import LoginForm from "../../components/forms/LoginForm";

const Login = () => {
  return (
    <div>
      <Helmet>
        <title>login here</title>
      </Helmet>
      <Title order={2}>Sign In</Title>
      <Text>
        new to dukaan? <Link to="/auth/register">Create account here.</Link>
      </Text>

      <LoginForm />
    </div>
  );
};
export default Login;
