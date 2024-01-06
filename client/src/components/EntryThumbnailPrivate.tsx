import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import useFetchEntry from "../hooks/queries/useFetchEntry";
import useFetchPhotoUrl from "../hooks/queries/useFetchPhotoUrl";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage } from "@cloudinary/react";
import { cloudinaryFnc } from "../functions/cloudinaryFnc";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import useDeleteEntry from "../hooks/mutations/useDeleteEntryMutation";
import { card, cardActionArea, cardContent, box } from "../styles/entryThumbnailPrivate";

interface Props {
  id: number;
  uuid: string;
}
export default function EntryThumbnailPrivate({ uuid, id }: Props) {
  const { entry } = useFetchEntry(id);
  const { url } = useFetchPhotoUrl(uuid);

  const cld = cloudinaryFnc();

  const navigate = useNavigate();
  const authContext = useAuthContext();
  const handleClick = () => {
    authContext.setEntry(entry!);
    navigate(`/edit/${entry!.id}`);
  };
  const { deleteEntry } = useDeleteEntry();
  const handleDeleteEntry = async () => {
    try {
      await deleteEntry(uuid);
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  };
  return (
    <Card sx={card}>
      <CardActionArea
        sx={cardActionArea}
      >
        <AdvancedImage
          cldImg={cld.image(url).resize(fill().width(200).height(300))}
        />
        <CardContent
          sx={cardContent}
        >
          <Typography gutterBottom variant="h5" component="div">
            {entry?.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {entry?.description}
          </Typography>
        </CardContent>
        <Box sx={box}>
          <Button
            onClick={handleClick}
            size="medium"
            variant="outlined"
            color="info"
          >
            Edit
          </Button>
          <Button
            onClick={handleDeleteEntry}
            size="medium"
            variant="outlined"
            color="warning"
          >
            Delete
          </Button>
        </Box>
      </CardActionArea>
    </Card>
  );
}
