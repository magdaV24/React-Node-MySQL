import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import {
    Box,
    Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import ErrorAlert from "../components/ErrorAlert";
import { useMutation, useQuery } from "react-query";
import postData from "../functions/postData";
import { DETERMINE_ID, SUBMIT_ART_WORK } from "../api/urls";
import fetchData from "../functions/fetchData";

export default function ArtWorkForm() {
  const { user } = useContext(AuthContext);
  const {
    control,
    getValues,
    setValue,
    formState: { errors },
    reset,
    handleSubmit
  } = useForm();

  const submit_mutation = useMutation((input: unknown) =>
    submit_art_work(input)
  );

  const submit_art_work = async (input: unknown) => {
    try {
      return await postData(SUBMIT_ART_WORK, input);
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  };

  const { data } = useQuery( 'idsQuery', async () => await fetchData(DETERMINE_ID));

  const onSubmit = () => {
    console.log(data)
  }
  return (
    <Container>
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
    </Container>
  );
}
