import { Modal, Box, Typography, Fab } from "@mui/material";
import { fill } from "@cloudinary/url-gen/actions/resize";
import ArrowBackIosNewSharpIcon from "@mui/icons-material/ArrowBackIosNewSharp";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { Entry } from "../types/Entry";
import { useState } from "react";
import { cloudinaryFnc } from "../functions/cloudinaryFnc";
import { AdvancedImage } from "@cloudinary/react";
import useFetchEntryPhotos from "../hooks/queries/useFetchEntryPhotos";
import { Photo } from "../types/Photo";
import { boxWrapper, leftBox, modal, rightBox } from "../styles/entryModal";
import { useNavigate } from "react-router-dom";

interface Props {
  entry: Entry;
  open: boolean;
  handleClose: () => void;
  username: string;
}

export default function EntryModal({
  entry,
  open,
  handleClose,
  username,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cld = cloudinaryFnc();
  const { entryPhotos } = useFetchEntryPhotos(entry!.uuid);
  const moveBack = (photos: Photo[]) => {
    setCurrentIndex((prev) => (prev - 1 + photos!.length) % photos!.length);
  };
  const moveForward = (photos: Photo[]) => {
    setCurrentIndex((prev) => (prev + 1) % photos!.length);
  };

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/${username}`);
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={modal}
    >
      <Box sx={boxWrapper}>
        <Box sx={leftBox}>
          <Box>
            {entryPhotos !== undefined && entryPhotos?.length > 1 && (
              <>
                <Fab
                  color="primary"
                  aria-label="back"
                  onClick={() => moveBack(entryPhotos!)}
                  sx={{ mt: -30, mr: 1, width: "2.6vw", height: "5vh" }}
                >
                  <ArrowBackIosNewSharpIcon />
                </Fab>

                {entryPhotos !== undefined && (
                  <AdvancedImage
                    cldImg={cld
                      .image(entryPhotos![currentIndex].url || "")
                      .resize(fill().width(150).height(250))}
                  />
                )}

                <Fab
                  color="primary"
                  aria-label="forward"
                  onClick={() => moveForward(entryPhotos!)}
                  sx={{ mt: -30, ml: 1, width: "2.6vw", height: "5vh" }}
                >
                  <ArrowForwardIosSharpIcon />
                </Fab>
              </>
            )}
            {entryPhotos !== undefined && entryPhotos?.length === 1 && (
              <AdvancedImage
                cldImg={cld
                  .image(entryPhotos![0].url || "")
                  .resize(fill().width(150).height(250))}
              />
            )}
          </Box>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {entry!.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            onClick={handleNavigate}
          >
            by {username}
          </Typography>
        </Box>
        <Box sx={rightBox}>
          <Typography>{entry.description}</Typography>
        </Box>
      </Box>
    </Modal>
  );
}
