import { Container, TextField, CircularProgress, Button } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import useLogin from "../hooks/mutations/useLoginMutation";
import { useAuthContext } from "../hooks/useAuthContext";
import { formStyles, loadingButton } from "../styles/app";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm();
  const { login, loginLoading } = useLogin();
  const authContext = useAuthContext();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      authContext.setDisabled(true);
      const input = { ...getValues() };
      await login(input);
      authContext.setDisabled(false);
      reset();
      navigate("/dashboard");
    } catch (error) {
      authContext.setError(error as string);
      authContext.setOpenError(true);
    }
  };

  useEffect(() => {
    if (errors.password) {
      authContext.setError("Password error: " + errors.password.message);
      authContext.setOpenError(true);
    } else if (errors.username) {
      authContext.setOpenError(true);
      authContext.setError("Username error: " + errors.username.message);
    } else if (authContext.error !== "") {
      authContext.setError(authContext.error);
      authContext.setOpenError(true);
    } else if (authContext.message !== "" && authContext.user !== null) {
      authContext.setMessage(authContext.message);
      authContext.setOpenMessage(true);
    } else {
      authContext.clearError();
    }
  }, [authContext, errors.password, errors.username]);

  return (
    <Container sx={formStyles}>
      <Controller
        name="username"
        defaultValue=""
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
      <Controller
        name="password"
        control={control}
        defaultValue=""
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
      {loginLoading ? (
        <Button sx={loadingButton} disabled={authContext.disabled}>
          <CircularProgress />
        </Button>
      ) : (
        <Button
          disabled={authContext.disabled}
          type="submit"
          onClick={handleSubmit(handleLogin)}
          variant="outlined"
          size="large"
        >
          LOGIN
        </Button>
      )}
    </Container>
  );
}