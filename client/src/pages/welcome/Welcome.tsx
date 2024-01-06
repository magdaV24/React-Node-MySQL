import { Box, Button, Container } from "@mui/material";
import { welcomePage } from "../../styles/welcomePage";

export default function Welcome() {
  return (
    <Container sx={welcomePage}>
      <Box sx={{display: 'flex', gap: 1}}>
        <Button href="/login" variant="outlined" size="large" sx={{minWidth: '10vw'}}>
          Login
        </Button>
        <Button href="/register" variant="outlined" size="large" sx={{minWidth: '10vw'}}>
          Register
        </Button>
      </Box>
      <Button href="/dashboard" variant="outlined" size="large" sx={{minWidth: '20.5vw'}}>
        Dashboard
      </Button>
    </Container>
  );
}
