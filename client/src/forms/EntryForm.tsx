import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import {
  Box,
  Button,
  Card,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import ErrorAlert from "../components/ErrorAlert";
import { container_styles } from "../styles/art_works/artWorkForm";
import { PRESET } from "../api/cloudinary";
import { v4 as uuidv4 } from "uuid";
import useAddEntry from "../hooks/mutations/useAddEntryMutation";
import useAddPhoto from "../hooks/mutations/useAddPhotoMutation";
import { useAuthContext } from "../hooks/useAuthContext";
import useCloudinary from "../hooks/mutations/useCloudinaryMutation";
import SuccessAlert from "../components/SuccessAlert";

export default function EntryForm() {
  const { user, disabled, openMessage, openError } = useContext(AuthContext);
  const authContext = useAuthContext();
  const { add_entry, entryLoading } = useAddEntry();
  const add_photo = useAddPhoto();
  const submit_to_cloudinary = useCloudinary();
  const {
    control,
    getValues,
    formState: { errors },
    setValue,
    reset,
    handleSubmit,
  } = useForm({
    defaultValues: {
      photos: [] as File[],
      title: "",
      description: "",
      visible: false,
    },
  });

  const submitEntry = async () => {
    const uuid = uuidv4();
    authContext.setDisabled(true);
    try {
      const ids = await Promise.all(
        getValues("photos").map(async (photo: string | Blob) => {
          const formData = new FormData();
          formData.append("file", photo);
          formData.append("upload_preset", PRESET);

          try {
            const id = await submit_to_cloudinary(formData);
            return id;
          } catch (error) {
            throw new Error(`Error: ${error}`);
          }
        })
      );
      ids.map(async (id) => {
        const input = {
          uuid: uuid,
          url: id,
          userId: user!.id,
        };
        await add_photo(input);
      });
      const entry_input = {
        userId: user!.id,
        title: getValues("title"),
        description: getValues("description"),
        visible: getValues("visible"),
        uuid: uuid,
      };
      await add_entry(entry_input);
      authContext.setDisabled(false);
      reset();
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  useEffect(() => {
    if (errors.title) {
      authContext.setError(errors.title.message as string);
    } else if (errors.description) {
      authContext.setError(errors.description.message as string);
    } else if (errors.photos) {
      authContext.setError(errors.photos.message as string);
    } else if (authContext.error !== "") {
      authContext.setError(authContext.error);
      authContext.setOpenError(true);
    } else if (authContext.message !== "") {
      authContext.setMessage(authContext.message);
      authContext.setOpenMessage(true);
    } else {
      authContext.clearError();
    }
  }, [authContext, errors.description, errors.photos, errors.title]);
  return (
    <Card sx={container_styles}>
      <Controller
        name="title"
        control={control}
        rules={{
          required: "Title required!",
        }}
        render={({ field }) => (
          <TextField
            id="title-standard-basic"
            label="Title"
            variant="outlined"
            autoFocus
            {...field}
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        rules={{
          required: "Description required!",
        }}
        render={({ field }) => (
          <TextField
            id="description-standard-basic"
            label="Description"
            variant="outlined"
            multiline
            minRows={5}
            autoFocus
            {...field}
          />
        )}
      />
      <Controller
        name="visible"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            label="Do you want this entry to be public?"
            control={
              <Checkbox
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            }
          />
        )}
      />
      <Controller
        name="photos"
        control={control}
        rules={{ required: "At least a photo is required!" }}
        render={({ field }) => (
          <Button variant="contained">
            Upload photos
            <input
              id="photos-standard-basic"
              type="file"
              multiple
              onChange={(e) => {
                const photos = Array.from(e.target.files || []);
                setValue("photos", [...field.value, ...photos]);
              }}
              key={Math.random()}
              // style={{display: 'none'}}
            />
          </Button>
        )}
      />
      {entryLoading ? (
        <Box>
          <CircularProgress />
        </Box>
      ) : (
        <Button
          type="submit"
          onClick={handleSubmit(submitEntry)}
          variant="outlined"
          size="large"
          disabled={disabled}
        >
          ADD ENTRY
        </Button>
      )}
      {openMessage && <SuccessAlert />}
      {openError && <ErrorAlert />}
    </Card>
  );
}
