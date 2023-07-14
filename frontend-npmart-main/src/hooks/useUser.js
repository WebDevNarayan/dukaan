import { useLocalStorage } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/api";

const useUser = () => {
  const {
    data: response,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: api.auth.me,
  });

  const [accessToken, setAccessToken] = useLocalStorage({
    key: "accessToken",
    defaultValue: null,
  });

  const navigate = useNavigate();

  const logout = () => {
    setAccessToken(null);
    navigate("/auth/login");
  };

  return {
    user: response?.data?.user,
    isLoading,
    error,
    logout,
  };
};

export default useUser;
