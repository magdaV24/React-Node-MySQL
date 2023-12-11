import {
  Container,
  Typography,
  TextField,
  Box,
  CircularProgress,
  Button,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorAlert from "../components/ErrorAlert";
import SuccessAlert from "../components/SuccessAlert";
import {
  button_styles,
  container_styles,
  style,
} from "../styles/login/loginForm";
import FaceSharpIcon from "@mui/icons-material/FaceSharp";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";

export default function Login() {
  const location = useLocation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm();
  const { login, message, error, loading } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = () => {
    const input = { ...getValues() };
    try {
      login(input);
      reset();
      if (location.pathname === "/") {
        navigate("/dashboard");
      }
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  };

  return (
    <Container sx={style} component="form">
      <Container sx={container_styles}>
        <FaceSharpIcon color="primary" />
        <Typography variant="h6">Login</Typography>
      </Container>
      <Controller
        name="username"
        control={control}
        rules={{ required: "Username required!" }}
        render={({ field }) => (
          <TextField
            id="username-standard-basic"
            label="Username"
            variant="outlined"
            autoFocus
            {...field}
          />
        )}
      />
      {errors.username && (
        <ErrorAlert message={errors.username.message as string} />
      )}
      <Controller
        name="password"
        control={control}
        rules={{ required: "Password required!" }}
        render={({ field }) => (
          <TextField
            id="password-standard-basic"
            label="Password"
            type="password"
            variant="outlined"
            autoFocus
            {...field}
          />
        )}
      />
      {errors.password && (
        <ErrorAlert message={errors.password.message as string} />
      )}
      {loading ? (
        <Box sx={button_styles}>
          <CircularProgress />
        </Box>
      ) : (
        <Button
          sx={button_styles}
          type="submit"
          onClick={handleSubmit(handleLogin)}
        >
          LOGIN
        </Button>
      )}
      {message && <SuccessAlert message={message} />}
      {error && <ErrorAlert message={error} />}
    </Container>
  );
}
