import { Container, Card, CardHeader, Typography } from "@mui/material";
import Register from "../../forms/Register";

import HowToRegIcon from "@mui/icons-material/HowToReg";
import { card_styles } from "../../styles/register/registerPage";

export default function RegisterPage() {
  return (
    <Container className="body">
      <Card
        sx={card_styles}
      >
        <CardHeader
          avatar={<HowToRegIcon color="primary" sx={{ fontSize: "3.5rem" }} />}
          title={
            <Typography variant="h5" color="primary.light" sx={{ mr: 9 }}>
              CREATE AN ACCOUNT
            </Typography>
          }
        />
        <Register />
      </Card>
    </Container>
  );
}
