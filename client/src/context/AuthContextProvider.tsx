import { createContext, useEffect, useState } from "react";
import { LightTheme } from "../themes/Light";
import { createTheme } from "@mui/material";
import { DarkTheme } from "../themes/Dark";
import { AuthContextProviderType } from "./AuthContextProviderType";
import { AuthContextType } from "./AuthContextType";
import useLogin from "../hooks/mutations/useLoginMutation";

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider = ({ children }: AuthContextProviderType) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [theme, setTheme] = useState(
    JSON.parse(localStorage.getItem("Theme")!) || "Dark"
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("User")!) || null
  );

  const [entry, setEntry] = useState( JSON.parse(localStorage.getItem("Entry")!) || null);
  const [openMessage, setOpenMessage] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [token, setToken] = useState( JSON.parse(localStorage.getItem("Token")!) || null)
  const clearMessage = () => {
    setMessage("");
    setOpenMessage(false)
  }

  const clearError = () => {
    setError("");
    setOpenError(false)
  }

  const handleCloseMessage = () => {
    clearMessage();
    setOpenMessage(false);
  }

  const handleCloseError = () => {
    clearError();
    setOpenError(false);
  }

  const handleCloseBackdrop = () => {
    setOpenBackdrop(false)
  }

  const handle_theme = () => {
    if (theme === "Dark") {
      setTheme("Light");
    } else {
      setTheme("Dark");
    }
  };

  const {login} = useLogin();
  const light_theme = createTheme(LightTheme);
  const dark_theme = createTheme(DarkTheme);

  const current_theme = theme === "Dark" ? dark_theme : light_theme;

  const logout = () => {
    localStorage.removeItem("User");
    setUser(null);
    localStorage.removeItem("Token");
    setToken(null);
    localStorage.removeItem("Entry");
    setEntry(null);
  };

  useEffect(() => {
    localStorage.setItem("Theme", JSON.stringify(theme));
    localStorage.setItem("User", JSON.stringify(user));
    localStorage.setItem("Entry", JSON.stringify(entry));
    localStorage.setItem("Token", JSON.stringify(token));
  }, [theme, user, entry, token]);

  return (
    <AuthContext.Provider
      value={{
        handle_theme,
        current_theme,
        user,
        setUser,
        entry,
        setEntry,
        message,
        setMessage,
        error,
        setError,
        login,
        logout,
        openMessage,
        openError,
        openBackdrop,
        setOpenMessage,
        setOpenError,
        setOpenBackdrop,
        clearMessage,
        clearError,
        handleCloseMessage,
        handleCloseError,
        handleCloseBackdrop, 
        disabled,
        setDisabled,
        token, 
        setToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
