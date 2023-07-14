import { Anchor, Button, Stack, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/UseAuth";
import { verifySchema } from "../../Schemas/AuthSchema";
import { api } from "../../utils/api";

const VerifyForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const verify = useMutation({
    mutationFn: api.auth.verify,
    onError: (error) => {
      console.log(error);
      error.response.data &&
        error.response.data.errors &&
        form.setErrors(error.response.data.errors);
    },
    onSuccess: (response) => {
      toast.success("Email verified successfully");
      navigate("/");
    },
  });

  const resendVerification = useMutation({
    mutationFn: api.auth.resendVerification,
    onError: (error) => {
      console.log(error);
      toast.error("Failed to resend verification email");
    },
    onSuccess: (response) => {
      console.log(response);
      toast.success("Verification email sent successfully");
    },
  });

  const form = useForm({
    validate: zodResolver(verifySchema),
  });

  const handleSubmit = (values) => {
    verify.mutate({
      id: user.id,
      token: values.token,
    });
  };

  return (
    <form
      style={{
        marginTop: "1rem",
      }}
      onSubmit={form.onSubmit(handleSubmit)}
    >
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
      <Stack>
        <TextInput
          {...form.getInputProps("token")}
          placeholder="jhon@dukaan.com"
          label="Enter your OTP"
        />
        <Anchor
          onClick={() =>
            resendVerification.mutate({
              email: user.email,
            })
          }
          component="button"
        >
          {resendVerification.isLoading ? "Sending..." : "Resend OTP"}
        </Anchor>
        <Button type="submit" loading={verify.isLoading}>
          Continue
        </Button>
      </Stack>
    </form>
  );
};
export default VerifyForm;
