import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import useFetchEntry from "../hooks/queries/useFetchEntry";
import useFetchPhotoUrl from "../hooks/queries/useFetchPhotoUrl";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage } from "@cloudinary/react";
import { cloudinaryFnc } from "../functions/cloudinaryFnc";
import useFetchUsername from "../hooks/queries/useFetchUsername";
import { useState } from "react";
import EntryModal from "./EntryModal";
import { useNavigate } from "react-router-dom";
import { compass } from "@cloudinary/url-gen/qualifiers/gravity";

interface Props {
  id: number;
  uuid: string;
}
export default function EntryThumbnail({ uuid, id }: Props) {
  const { entry } = useFetchEntry(id);
  const { url } = useFetchPhotoUrl(uuid);

  const cld = cloudinaryFnc();

  const { username } = useFetchUsername(entry?.userId);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/${username}`);
  };
  return (
    <Card sx={{ maxWidth: 300, p: 2, minHeight: 320, height: 'fit-content' }}>
      <CardActionArea
        onClick={() => setOpen(true)}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AdvancedImage
          cldImg={cld.image(url).resize( fill()
            .width(200)
            .height(250)
            .aspectRatio("1.0")
            .gravity(compass("center")))}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {entry?.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            onClick={handleNavigate}
          >
            by {username}
          </Typography>
        </CardContent>
      </CardActionArea>
      {entry && (
        <EntryModal entry={entry} open={open} handleClose={handleClose} username={username}/>
      )}
    </Card>
  );
}
