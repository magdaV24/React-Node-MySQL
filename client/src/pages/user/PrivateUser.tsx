import { Box, Container } from "@mui/material";
import { pageWrapper } from "../../styles/app";
import Bar from "../../components/Bar";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContextProvider";
import useFetchUserEntries from "../../hooks/queries/useFetchUserEntries";
import EntryThumbnailPrivate from "../../components/EntryThumbnailPrivate";

export default function PrivateUser() {
    const { user } = useContext(AuthContext);
    const { userEntries } = useFetchUserEntries(user.id);
    console.log(userEntries)
    return (
        <Container sx={pageWrapper}>
            <Bar />
            <Box className="entries_wrapper">
            {userEntries && userEntries.map((entry) => (
                <EntryThumbnailPrivate id={entry.id} uuid={entry.uuid} key={entry.id}/>
            ))}
            </Box>
        </Container>
    )
    
}
