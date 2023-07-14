
import { Title } from "@mantine/core";
import { Helmet } from "react-helmet";
import ResetPasswordForm from "../../components/forms/ResetPasswordForm";

const ResetPassword = () => {
  return <div>
     <Helmet>
      <title>
        Reset your Password
      </title>
    </Helmet>
  <Title order={2}>Sign In</Title>
  <ResetPasswordForm />
</div>
};
export default ResetPassword;