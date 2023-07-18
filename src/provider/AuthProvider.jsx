import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isLoading, setLoading] = useState(true);
  // const user = { name: "ase", email: "email" };
  // const user = null;

  const authInfo = {
    user,
    setUser,
    isLoading,
  };

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/users?email=${localStorage.getItem(
          "userEmail"
        )}`
      )
      .then((res) => {
        if (res?.data?.isLoggedIn) {
          setUser(res.data);
          setLoading(false);
        } else {
          setUser(null);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
