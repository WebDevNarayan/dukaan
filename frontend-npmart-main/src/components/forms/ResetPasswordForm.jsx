import { Button, PasswordInput, Stack, TextInput } from "@mantine/core";

const ResetPasswordForm = () => {
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
        <PasswordInput label="password" placeholder="At least 6 character" />
        <PasswordInput label="Confirm Your password" />
        <Button>Continue</Button>
      </Stack>
    </form>
  );
};
export default ResetPasswordForm;
