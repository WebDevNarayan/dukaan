import { Button, PasswordInput, Stack, Text, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/UseAuth";
import { loginSchema } from "../../Schemas/AuthSchema";
import { api } from "../../utils/api";
import { queryClient } from "../../main";

const LoginForm = () => {
  const { setUser, setAccessToken } = useAuth();
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: "",
      Password: "",
    },
    validate: zodResolver(loginSchema),
  });

  const login = useMutation({
    mutationFn: api.auth.login,
    onError: (error) => {
      error.response.data &&
        error.response.data.error &&
        form.setErrors(error.response.data.errors);
    },

    onSuccess: (response) => {
      toast.success("Login Successful");
      setUser(response.data.user);
      setAccessToken(response.data.accessToken);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });

      document.dispatchEvent(new Event("onAuthStateChange"));
      navigate("/");
    },
  });

  const handleSubmit = (values) => {
    login.mutate(values);
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
          type="email"
          placeholder="jhon@dukaan.com"
          label="Your Email"
          {...form.getInputProps("email")}
        />
        <div>
          <PasswordInput
            label="password"
            placeholder="Enter your Password"
            {...form.getInputProps("password")}
          />
          <Text size="sm" mt="0.5">
            forgot Password? <Link to="/auth/forgot-password">Reset Here</Link>
          </Text>
        </div>
        <Button loading={login.isLoading} type="submit">
          Continue
        </Button>
      </Stack>
    </form>
  );
};
export default LoginForm;
