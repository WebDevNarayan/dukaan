import { Button, Stack, TextInput, Text } from "@mantine/core";
import { Link } from "react-router-dom";
const ForgotPasswordForm = () => {
  return (
    <form
      style={{
        marginTop: "1rem",
      }}
    >
      <Stack>
        <TextInput label="Your Name" placeholder="Enter your name" />
        <TextInput
          type="email"
          placeholder="jhon@dukaan.com"
          label="Your Email"
        />
        <Button>Continue</Button>
        <Text>
          Remember your password? <Link to="/auth/login">Login here</Link>
        </Text>
      </Stack>
    </form>
  );
};
export default ForgotPasswordForm;
