import { createContext } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  // const user = { name: "ase", email: "email" };
  const user = null;

  const authInfo = {
    user,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
