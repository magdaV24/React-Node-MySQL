import {
  Container,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import useEditFields from "../hooks/mutations/useEditFieldsMutation";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { useAuthContext } from "../hooks/useAuthContext";

interface Props {
  title: string | undefined;
  description: string | undefined;
  visible: boolean | undefined;
  id: number
}

export default function EditFields({ title, description, visible, id }: Props) {
  const { control, handleSubmit, getValues } = useForm();
  const { disabled } = useContext(AuthContext);
  const authContext = useAuthContext()

  const { edit_fields } = useEditFields(id);

  const onSubmit = async () => {
    try {
      authContext.setDisabled(true);
      const input = { ...getValues() };
      await edit_fields(input);
      authContext.setDisabled(false);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container sx={{display: 'flex', flexDirection: 'column', gap: 2, mt: 2}}>
      <Controller
        control={control}
        name="title"
        render={({ field }) => (
          <TextField
            sx={{ width: "90%", backgroundColor: "secondary.main" }}
            autoFocus
            {...field}
            defaultValue={title}
            onChange={(e) => field.onChange(e.target.value)}
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
            defaultValue={description}
            minRows={5}
            autoFocus
            {...field}
          />
        )}
      />
      <Controller
        name="visible"
        control={control}
        defaultValue={visible}
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

      <Button onClick={handleSubmit(onSubmit)} disabled={disabled} variant='outlined' size="large">SUBMIT EDIT</Button>
    </Container>
  );
}
