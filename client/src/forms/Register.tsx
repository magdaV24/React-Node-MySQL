import { Container, TextField, Button, Box, CircularProgress } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import ErrorAlert from "../components/ErrorAlert";
import { container_styles } from "../styles/register/registerForm";
import { useMutation } from "react-query";
import postData from "../functions/postData";
import { CLOUDINARY, PRESET } from "../api/cloudinary";
import { REGISTER } from "../api/urls";

export default function Register() {
  const {
    control,
    getValues,
    setValue,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();

  const cloudinary_mutation = useMutation(
    async (input: unknown) => await submit_to_cloudinary(input),
    {
      onSuccess: (data) => {
        const avatar = data.public_id;
        setValue("avatar", avatar);
        const submit = { ...getValues() };
        registration_mutation.mutate(submit);
      },
    }
  );
  const registration_mutation = useMutation(
    async (input: unknown) => await submit_registration(input), {
      onSuccess: () => reset()
    }
  );

  const submit_to_cloudinary = async (input: unknown) => {
    try {
      return await postData(CLOUDINARY, input);
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  };

  const submit_registration = async (input: unknown) => {
    try {
      return await postData(REGISTER, input);
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  };

  const onSubmit = async () => {
    const avatar = getValues("avatar");
    if (avatar === undefined) {
      return console.log("Undefined avatar");
    }
    const formData = new FormData();

    formData.append("file", avatar[0]);
    formData.append("upload_preset", PRESET);
    cloudinary_mutation.mutate(formData);
  };
  return (
    <Container sx={container_styles}>
      <Controller
        name="email"
        control={control}
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
      {errors.email && <ErrorAlert message={errors.email.message as string} />}
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
        name="website"
        control={control}
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
      {errors.website && (
        <ErrorAlert message={errors.website.message as string} />
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
      <Controller
        name="confirmPassword"
        control={control}
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
      {errors.confirmPassword && (
        <ErrorAlert message={errors.confirmPassword.message as string} />
      )}
      <Controller
        name="avatar"
        control={control}
        rules={{ required: "Avatar required!" }}
        render={({ field }) => (
          <Button variant="contained">
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
      {errors.avatar && (
        <ErrorAlert message={errors.avatar.message as string} />
      )}
      {registration_mutation.isLoading ? (
              <Box>
                <CircularProgress />
              </Box>
            ) : (
              <Button
                type="submit"
                onClick={handleSubmit(onSubmit)}
                variant="outlined"
                size="large"
              >
                REGISTER
              </Button>
            )}
    </Container>
  );
}
