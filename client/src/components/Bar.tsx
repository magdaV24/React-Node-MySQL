import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Container,
} from "@mui/material";
import BrushSharpIcon from "@mui/icons-material/BrushSharp";
import { bar_styles, button_container } from "../styles/components/bar";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";

export default function Bar() {
  const { user, logout } = useContext(AuthContext);
  return (
    <AppBar position="fixed" sx={bar_styles}>
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <BrushSharpIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" component="div">
          Art Gallery
        </Typography>
      </Toolbar>
      <Toolbar>
        {user ? (
          <Button variant="outlined" onClick={logout} color="secondary">
            Logout
          </Button>
        ) : (
          <Container sx={button_container}>
            <Button variant="outlined" href="/login" color="secondary">Login</Button>
            <Button variant="outlined" href="/register" color="secondary">Register</Button>
          </Container>
        )}
      </Toolbar>
    </AppBar>
  );
}
