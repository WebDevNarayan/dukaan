import { api } from "../utils/api"
import { createContext, useEffect, useState } from "react"
import { useLocalStorage } from "@mantine/hooks";


export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useLocalStorage({
    key: "accessToken",
    defaultValue: null,
  });


  const returnValues = {
    user,
    setUser,
    accessToken,
    setAccessToken,

  }

  useEffect(() => {
      api.auth.onAuthStateChange((response) => {
        if (response) {
          setUser(response.data.user)
        }
      })
  },[])

  return <AuthContext.Provider value={returnValues}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
