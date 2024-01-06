import { useContext } from "react";
import { AuthContext } from "../../context/AuthContextProvider";
import { Box, Container, Typography, Button } from "@mui/material";
import useFetchEntryPhotos from "../../hooks/queries/useFetchEntryPhotos";
import { pageWrapper } from "../../styles/app";
import Bar from "../../components/Bar";
import EditPhoto from "../../forms/EditPhoto";
import EditFields from "../../forms/EditFields";
import AutoAwesomeSharpIcon from "@mui/icons-material/AutoAwesomeSharp";
import { Controller, useForm } from "react-hook-form";
import useCloudinary from "../../hooks/mutations/useCloudinaryMutation";
import useAddPhoto from "../../hooks/mutations/useAddPhotoMutation";
import { PRESET } from "../../api/cloudinary";

export default function EditEntryPage() {
  const { entry, disabled, setDisabled, user } = useContext(AuthContext);
  const uuid = entry!.uuid
  const { entryPhotos } = useFetchEntryPhotos(uuid);

  const { control, getValues, handleSubmit } = useForm();

  const add_photo = useAddPhoto();
  const submit_to_cloudinary = useCloudinary();
  
  const onSubmit = async () => {
    setDisabled(true)
    const photo = getValues("photo");
    if (photo === undefined) {
      return console.log("Undefined photo");
    }
    const formData = new FormData();

    formData.append("file", photo[0]);
    formData.append("upload_preset", PRESET);
    try {
      const id = await submit_to_cloudinary(formData);
      const input = {
        url: id,
        userId: user.id,
        uuid: entry!.uuid
      };
      await add_photo(input)
      setDisabled(false)
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  return (
    <Container sx={pageWrapper}>
      <Bar />
      <Box
        sx={{
          backgroundColor: "background.paper",
          p: 2,
          overflowY: "auto",
          height: "fit-content",
          mt: 10,
          width: "40vw",
        }}
      >
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-star', gap: 1, mb: 1}}>
          <AutoAwesomeSharpIcon sx={{color: "primary.light"}} />
          <Typography variant="h5" color="primary.light" sx={{ mr: 9 }}>
            EDIT ENTRY
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          {entryPhotos &&
            entryPhotos.map((photo) => (
              <EditPhoto id={photo.id} url={photo.url} key={photo.id} />
            ))}
        </Box>
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-star', gap: 1, mb: 1, mt: 1}}>
        <Controller
        name="photo"
        control={control}
        render={({ field }) => (
          <Button variant="contained" disabled={disabled}>
            Choose photo
            <input
              id="avatar-standard-basic"
              type="file"
              onChange={(e) => field.onChange(e.target.files)}
              // style={{display: 'none'}}
            />
          </Button>
        )}
      />
      <Button disabled={disabled} onClick={handleSubmit(onSubmit)} variant='outlined' size="large">ADD PHOTO</Button>

        </Box>
        <EditFields
          title={entry?.title}
          description={entry?.description}
          visible={entry?.visible}
          id={entry!.id}
        />
      </Box>
    </Container>
  );
}
