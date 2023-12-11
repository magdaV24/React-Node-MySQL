import { useContext, useState } from "react";
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
import { useMutation } from "react-query";
import postData from "../functions/postData";
import { ADD_PHOTO, SUBMIT_ART_WORK } from "../api/urls";
import { container_styles } from "../styles/art_works/artWorkForm";
import { CLOUDINARY, PRESET } from "../api/cloudinary";

export default function ArtWorkForm() {
  const { user } = useContext(AuthContext);
  const {
    control,
    getValues,
    formState: { errors },
    reset,
    handleSubmit
  } = useForm();

  const [photosArr, setPhotosArr] = useState<File[]>([])
  const submit_mutation = useMutation((input: unknown) =>
    submit_art_work(input)
  );

  const cloudinary_mutation = useMutation(
    async (input: unknown) => await submit_to_cloudinary(input), 
    {
      onSuccess: (res) => {
        const userId = user.id;
        const artWorkTitle = getValues("title");
        const url = res.public_id;
        photo_mutation.mutate({userId, artWorkTitle, url});
      }
    }
  );

  const art_work_mutation = useMutation(
    async (input: unknown) => await submit_art_work(input), {
      onSuccess: () => reset()
    }
  )

  const photo_mutation = useMutation(async (input: unknown) =>await upload_photo(input));

  const submit_art_work = async (input: unknown) => {
    try {
      return await postData(SUBMIT_ART_WORK, input);
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  };
const submit_to_cloudinary = async (input: unknown) => {
    try {
      return await postData(CLOUDINARY, input);
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  };

  const upload_photo = async (input: unknown) => {
    try {
      return await postData(ADD_PHOTO, input)
    } catch (error) {
      throw new Error(`Error: ${error}`)
    }
  }
  const onSubmit = () => {
    photosArr.map((photo) => {
      const formData = new FormData();
      formData.append("file", photo);
      formData.append("upload_preset", PRESET);

      cloudinary_mutation.mutate(formData);

      const input = { ...getValues(),  } 
      art_work_mutation.mutate(input);
    })
  }
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
      {errors.title && <ErrorAlert message={errors.title.message as string} />}
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
      {errors.description && (
        <ErrorAlert message={errors.description.message as string} />
      )}
      <Controller
        name="visible"
        control={control}
        defaultValue={false}
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
      {errors.visible && (
        <ErrorAlert message={errors.visible.message as string} />
      )}
      <Controller
        name="avatar"
        control={control}
        rules={{ required: "At least a photo is required!" }}
        render={({ field }) => (
          <Button variant="contained">
            Upload photos
            <input
              id="avatar-standard-basic"
              type="file"
              multiple
              onChange={(e) => {
                const photos = Array.from(e.target.files || []);
                setPhotosArr((prevPhotos) => [...prevPhotos, ...photos]);
                field.onChange([...field.value, ...photos]);
              }}
              // style={{display: 'none'}}
            />
          </Button>
        )}
      />
      {errors.avatar && (
        <ErrorAlert message={errors.avatar.message as string} />
      )}
      {submit_mutation.isLoading ? (
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
    </Card>
  );
}
