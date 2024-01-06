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
import { useNavigate } from "react-router-dom";

export default function Bar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/home/${user!.username}`);
  }
  const handleLogout = () => {
    logout();
    navigate("/dashboard")
  }
  return (
    <AppBar position="fixed" sx={bar_styles}>
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          href={'/dashboard'}
        >
          <BrushSharpIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" component="div">
          Art Gallery
        </Typography>
      </Toolbar>
      <Toolbar>
        {user ? (
          <Container sx={button_container}>
            <Button variant="outlined" onClick={handleLogout} color="secondary">
            Logout
          </Button>
            <Button variant="outlined" href="/entry_form" color="secondary">Add Entry</Button>
            <Button variant="outlined" onClick={handleNavigate} color="secondary">Home</Button>
          </Container>
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
