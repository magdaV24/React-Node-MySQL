import { Container, Card, CardHeader, Typography } from "@mui/material";
import Login from "../../forms/Login";
import { card_styles } from "../../styles/register/registerPage";
import FaceSharpIcon from '@mui/icons-material/FaceSharp';

export default function LoginPage(){
    return(
        <Container className="body">
        <Card
          sx={card_styles}
        >
          <CardHeader
            avatar={<FaceSharpIcon color="primary" sx={{ fontSize: "3.5rem" }} />}
            title={
              <Typography variant="h5" color="primary.light" sx={{ mr: 9 }}>
                CREATE AN ACCOUNT
              </Typography>
            }
          />
          <Login />
        </Card>
      </Container>
    )
}