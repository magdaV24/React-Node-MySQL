import { Container, TextField, Button, CircularProgress } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import ErrorAlert from "../components/ErrorAlert";
import { PRESET } from "../api/cloudinary";
import useCloudinary from "../hooks/mutations/useCloudinaryMutation";
import useRegister from "../hooks/mutations/useRegisterMutation";
import { useContext, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { AuthContext } from "../context/AuthContextProvider";
import SuccessAlert from "../components/SuccessAlert";
import { formStyles, loadingButton } from "../styles/app";

export default function RegisterForm() {
  const {
    control,
    getValues,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();

  const submit_to_cloudinary = useCloudinary();
  const { register, registrationLoading } = useRegister();
  const authContext = useAuthContext();
  const { openMessage, openError, disabled, setDisabled } =
    useContext(AuthContext);
  const onSubmit = async () => {
    setDisabled(true);
    const avatar = getValues("avatar");
    if (avatar === undefined) {
      return console.log("Undefined avatar");
    }
    const formData = new FormData();

    formData.append("file", avatar[0]);
    formData.append("upload_preset", PRESET);
    try {
      const id = await submit_to_cloudinary(formData);
      const input = {
        ...getValues(),
        avatar: id,
      };
      await register(input);
      reset();
      setDisabled(false);
    } catch (error) {
      authContext.setError(error as string);
      authContext.setOpenError(true);
    }
  };
  useEffect(() => {
    if (errors.email) {
      authContext.setError("Email error: " + errors.email.message);
      authContext.setOpenError(true);
    } else if (errors.password) {
      authContext.setError("Password error: " + errors.password.message);
      authContext.setOpenError(true);
    } else if (errors.username) {
      authContext.setOpenError(true);
      authContext.setError("Username error: " + errors.username.message);
    } else if (errors.avatar) {
      authContext.setOpenError(true);
      authContext.setError("Avatar error: " + errors.avatar.message);
    } else if (authContext.error !== "") {
      authContext.setError(authContext.error);
      authContext.setOpenError(true);
    } else if (authContext.message !== "" && authContext.user !== null) {
      authContext.setMessage(authContext.message);
      authContext.setOpenMessage(true);
    } else {
      authContext.clearError();
    }
  }, [
    authContext,
    errors.avatar,
    errors.email,
    errors.password,
    errors.username,
  ]);
  return (
    <Container sx={formStyles}>
      <Controller
        name="email"
        control={control}
        defaultValue=""
        rules={{
          required: "Email required!",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Provide a valid e-mail address!",
          },
        }}
        render={({ field }) => (
          <TextField
            id="email-standard-basic"
            label="Email"
            variant="outlined"
            autoFocus
            {...field}
          />
        )}
      />
      <Controller
        name="username"
        control={control}
        defaultValue=""
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
        name="website"
        control={control}
        defaultValue=""
        rules={{ required: "Website required!" }}
        render={({ field }) => (
          <TextField
            id="website-standard-basic"
            label="Website"
            variant="outlined"
            autoFocus
            {...field}
          />
        )}
      />
      <Controller
        name="password"
        defaultValue=""
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
      <Controller
        name="confirmPassword"
        control={control}
        defaultValue=""
        rules={{
          required: "Confirm you password!",
          validate: (password) =>
            password === getValues("password") ||
            "The two passwords do not match!",
        }}
        render={({ field }) => (
          <TextField
            id="confirm-password-standard-basic"
            label="Confirm Password"
            type="password"
            variant="outlined"
            autoFocus
            {...field}
          />
        )}
      />
      <Controller
        name="avatar"
        control={control}
        rules={{ required: "Avatar required!" }}
        render={({ field }) => (
          <Button variant="contained" disabled={disabled}>
            Upload an avatar
            <input
              id="avatar-standard-basic"
              type="file"
              onChange={(e) => field.onChange(e.target.files)}
              // style={{display: 'none'}}
            />
          </Button>
        )}
      />
      {registrationLoading ? (
        <Button
          disabled={authContext.disabled}
          variant="outlined"
          size="large"
          sx={loadingButton}
        >
          <CircularProgress />
        </Button>
      ) : (
        <Button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          variant="outlined"
          size="large"
          disabled={authContext.disabled}
        >
          REGISTER
        </Button>
      )}
      {openError && <ErrorAlert />}
      {openMessage && <SuccessAlert />}
    </Container>
  );
}
