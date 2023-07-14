import { Title } from "@mantine/core";
import { Helmet } from "react-helmet";
import VerifyForm from "../../components/forms/VerifyForm";

const Verify = () => {
  return <div>
    <Helmet>
      <title>
        Verify your email
      </title>
    </Helmet>
  <Title order={2}>Verify your email</Title>
 

  <VerifyForm />
</div>
};
export default Verify;