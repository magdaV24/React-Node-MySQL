import { Box, AppBar, Toolbar, Typography } from "@mui/material";
import { User } from "../types/User";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage } from "@cloudinary/react";
import { cloudinaryFnc } from "../functions/cloudinaryFnc";
import { Link } from "react-router-dom";

interface Props {
  user: User | null;
  count: number;
}
export default function UserBar({ user, count }: Props) {
  const cld = cloudinaryFnc();
  const  website = user?.website;
  const username = user?.username
  const avatar = user?.avatar

  return (
    <Box>
      <AppBar
        sx={{
          flexGrow: 1,
          width: "40vh",
          height: "100vh",
          position: "fixed",
          zIndex: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Toolbar
          sx={{ mt: 10, display: "flex", flexDirection: "column", gap: 1 }}
        >
          <AdvancedImage
            cldImg={cld
              .image(avatar)
              .resize(fill().width(150).height(200))}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {username}
          </Typography>
          <Link to={website!}>{website}</Link>
          {count === 1 && <Typography color="text.secondary">{count} public work</Typography>}
          {count > 1 && <Typography color="text.secondary">{count} public works</Typography>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
