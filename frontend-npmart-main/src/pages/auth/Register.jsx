import { Text, Title } from "@mantine/core";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import RegisterForm from "../../components/forms/RegisterForm";

const Register = () => {
  return (
    <div>
      <Helmet>
        <title>Register your email</title>
      </Helmet>
      <Title order={2}>Create Account</Title>
      <Text>
        Already got Account? <Link to="/auth/login">Login Here</Link>
      </Text>

      <RegisterForm />
    </div>
  );
};

export default Register;
