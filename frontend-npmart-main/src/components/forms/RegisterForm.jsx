import { Button, PasswordInput, Stack, Text, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/UseAuth";
import { queryClient } from "../../main";
import { registerSchema } from "../../Schemas/AuthSchema";
import { api } from "../../utils/api";

const RegisterForm = () => {
  const navigate = useNavigate();
  const form = useForm({
    validate: zodResolver(registerSchema),
  });

  const { setUser, setAccessToken } = useAuth();

  const register = useMutation({
    mutationFn: api.auth.register,
    onSuccess: (response) => {
      toast.success("Registration successfu. Please verify your email.");
      setUser(response.data.user);
      setAccessToken(response.data.accessToken);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      document.dispatchEvent(new Event("onAuthStateChange"));

      navigate("/auth/verify");
    },
    onError: (error) => {
      error.response.data &&
        error.response.data.errors &&
        form.setErrors(error.response.data.errors);
    },
  });

  const handleSubmit = (values) => {
    register.mutate(values);
  };

  return (
    <form
      style={{
        marginTop: "1rem",
      }}
      onSubmit={form.onSubmit(handleSubmit)}
    >
      <Stack>
        <TextInput
          {...form.getInputProps("name")}
          label="Your Name"
          placeholder="Enter your name"
        />
        <TextInput
          {...form.getInputProps("email")}
          type="email"
          placeholder="jhon@dukaan.com"
          label="Your Email"
        />
        <PasswordInput
          {...form.getInputProps("password")}
          label="password"
          placeholder="At least 6 character"
        />
        <PasswordInput
          {...form.getInputProps("confirmPassword")}
          label="Confirm Your password"
        />
        <Button loading={register.isLoading} type="submit">
          Continue
        </Button>
        <Text>
          By creating an account, you agree to our{" "}
          <Link to="/">Terms of service</Link> and{" "}
          <Link to="/">Privacy Policy</Link>
        </Text>
      </Stack>
    </form>
  );
};
export default RegisterForm;
