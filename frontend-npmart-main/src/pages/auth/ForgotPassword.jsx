import { Text, Title} from "@mantine/core";
import { Helmet } from "react-helmet";
import ForgotPasswordForm from "../../components/forms/ForgotPasswordForm";

const ForgotPassword = () => {
  return <div>
     <Helmet>
      <title>
        Forgot your password
      </title>
    </Helmet>
  <Title order={2}>Forgot Password</Title>
  <Text size='md'>
   No worries, Just enter your email 
  </Text>

<ForgotPasswordForm/>
  
</div>
};
export default ForgotPassword;