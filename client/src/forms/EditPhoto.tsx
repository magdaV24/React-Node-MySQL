import { fill } from "@cloudinary/url-gen/actions/resize";
import { cloudinaryFnc } from "../functions/cloudinaryFnc";
import { AdvancedImage } from "@cloudinary/react";
import { Box, Button } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import useDeletePhoto from "../hooks/mutations/useDeletePhotoMutation";
import { box, button } from "../styles/editPhoto";

interface Props {
  id: number;
  url: string;
}

export default function EditPhoto({ id, url }: Props) {
  const cld = cloudinaryFnc();
  const { deletePhoto } = useDeletePhoto();

  const handleDeletePhoto = async () => {
    try {
      await deletePhoto(id);
    } catch (error) {
      throw new Error(`Error: ${error}`)
    }
  }
  return (
    <Box
      sx={box}
    >
      <AdvancedImage
        cldImg={cld.image(url).resize(fill().width(150).height(250))}
      />
      <Button color="warning" onClick={handleDeletePhoto} size='large' variant="outlined" sx={button}>
        <HighlightOffIcon /> DELETE
      </Button>
    </Box>
  );
}
