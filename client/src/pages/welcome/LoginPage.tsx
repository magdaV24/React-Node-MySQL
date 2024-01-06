import { Card, CardHeader, Container, Link, Typography } from "@mui/material";
import LoginForm from "../../forms/LoginForm";
import FaceSharpIcon from "@mui/icons-material/FaceSharp";
import Bar from "../../components/Bar";
import { cardStyles, link, pageWrapper } from "../../styles/app";

export default function LoginPage() {
  return (
    <Container sx={pageWrapper}>
      <Bar />
      <Card sx={cardStyles}>
        <CardHeader
          avatar={<FaceSharpIcon color="primary" sx={{ fontSize: "3.5rem" }} />}
          title={
            <Typography variant="h5" color="primary.light" sx={{ mr: 9 }}>
              WELCOME BACK
            </Typography>
          }
        />
        <LoginForm />
        <Link href='/register' sx={link}>Don't have an account yet? Create one!</Link>
      </Card>
    </Container>
  );
}
