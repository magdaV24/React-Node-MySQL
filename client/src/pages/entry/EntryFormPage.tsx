import { Container } from "@mui/material";
import EntryForm from "../../forms/EntryForm";
import Bar from "../../components/Bar";
import './entryFormPage.css'

export default function EntryFormPage() {
    return(
        <Container className="wrapper">
            <Bar/>
            <EntryForm />
        </Container>
    )
}
