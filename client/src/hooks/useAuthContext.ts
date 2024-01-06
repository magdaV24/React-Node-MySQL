import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { AuthContextType } from "../context/AuthContextType";

export const useAuthContext = (): AuthContextType => {
  const authContext = useContext(AuthContext);
  return authContext;
};
