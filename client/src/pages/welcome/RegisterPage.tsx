import { Container, Card, CardHeader, Typography, Link } from "@mui/material";
import RegisterForm from "../../forms/RegisterForm";

import HowToRegIcon from "@mui/icons-material/HowToReg";
import { cardStyles, link, pageWrapper } from "../../styles/app";
import Bar from "../../components/Bar";

export default function RegisterPage() {
  return (
    <Container sx={pageWrapper}>
      <Bar />
      <Card
        sx={cardStyles}
      >
        <CardHeader
          avatar={<HowToRegIcon color="primary" sx={{ fontSize: "3.5rem" }} />}
          title={
            <Typography variant="h5" color="primary.light" sx={{ mr: 9 }}>
              CREATE AN ACCOUNT
            </Typography>
          }
        />
        <RegisterForm />
        <Link href='/login' sx={link}>Already have an account? Log in now!</Link>
      </Card>
    </Container>
  );
}
