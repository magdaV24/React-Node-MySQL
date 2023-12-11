import { Container } from "@mui/material";
import Bar from "../../components/Bar";
import ArtWorkForm from "../../forms/ArtWorkForm";

export default function Dashboard(){
    
    return (
        <Container>
            <ArtWorkForm />
            <Bar />
        </Container>
    )
}