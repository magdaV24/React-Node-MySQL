import { ReactNode, createContext, useEffect, useState } from "react";
import { LightTheme } from "../themes/Light";
import { Theme, createTheme } from "@mui/material";
import { DarkTheme } from "../themes/Dark";
import { User } from "../types/User";
import { useMutation } from "react-query";
import postData from "../functions/postData";
import { LOGIN } from "../api/urls";

type AuthContextType = {
  handle_theme: () => void;
  current_theme: Partial<Theme>;
  user: User;
  message: string;
  loading: boolean;
  error: string;
  login: (input: unknown) => void;
  logout: () => void;
};
type AuthContextProviderType = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider = ({ children }: AuthContextProviderType) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('')

  const [theme, setTheme] = useState(
    JSON.parse(localStorage.getItem("Theme")!) || "Dark"
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("User")!) || null
  );

  const handle_theme = () => {
    if(theme === "Dark"){
        setTheme("Light")
    } else{
        setTheme("Dark")
    }
  };

  const light_theme = createTheme(LightTheme);
  const dark_theme = createTheme(DarkTheme);

  const current_theme = theme === "Dark" ? dark_theme : light_theme;
// Login
const login_mutation = useMutation((input: unknown) => postData(LOGIN, input));

const login = async (input: unknown) => {
  try {
    await login_mutation.mutateAsync(input, {
      onSuccess:(res) => {
        if(res === "User not found!"|| res === "Incorrect password!"){
          setError(res);
        } else{
          setMessage("You logged in successfully!")
          setUser(res);
        }
      }
    })
  } catch (error) {
    throw new Error(`Error: ${error}`)
  }
}

// Logout

const logout = () => {
  localStorage.removeItem('User');
  setUser(null);
}

  useEffect(() => {
    localStorage.setItem("Theme", JSON.stringify(theme));
    localStorage.setItem("User", JSON.stringify(user));
    login_mutation.isLoading ? setLoading(true) : setLoading(false)
  }, [login_mutation.isLoading, theme, user]);

  
  return (
    <AuthContext.Provider value={{ current_theme, handle_theme, user, message, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
