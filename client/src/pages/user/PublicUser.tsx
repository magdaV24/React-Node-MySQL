import { Box, Container } from "@mui/material";
import UserBar from "../../components/UserBar";
import { pageWrapper } from "../../styles/app";
import Bar from "../../components/Bar";
import { useLocation } from "react-router-dom";
import useFetchUser from "../../hooks/queries/useFetchUser";
import useFetchUserPublicEntries from "../../hooks/queries/useFetchUserPublicEntries";
import EntryThumbnail from "../../components/EntryThumbnail";

export default function PublicUser() {
    const location = useLocation();
    const username = location.pathname.replace('/','');
    const { data } = useFetchUser(username);
    const userId = data?.id;

    const { userPublicEntries } = useFetchUserPublicEntries(userId);
    const entries = userPublicEntries || [];
    const count = entries.length;

    console.log(username, data)
    return(
        <Container sx={pageWrapper}>
            <Bar />
            <UserBar user={data!} count={count}/>
            <Box className="entries_wrapper right">
                {entries && entries.map((entry) => (
                    <EntryThumbnail id={entry!.id} uuid={entry!.uuid} key={entry!.id}/>
                ))}
            </Box>
        </Container>
    )
}
