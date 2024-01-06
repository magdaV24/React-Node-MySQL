import { Box, Container, Typography } from "@mui/material";
import Bar from "../../components/Bar";
import useFetchPublicEntries from "../../hooks/queries/useFetchPublicEntries";
import EntryThumbnail from "../../components/EntryThumbnail";
import { pageWrapper } from "../../styles/app";

export default function Dashboard() {
  const { publicEntries } = useFetchPublicEntries();

  return (
    <Container sx={pageWrapper}>
      <Box className="entries_wrapper">
        {publicEntries ? (
          publicEntries.map((entry) => (
            <EntryThumbnail id={entry.id} uuid={entry.uuid} key={entry.id} />
          ))
        ) : (
          <Typography>No public entries so far!</Typography>
        )}
      </Box>
      <Bar />
    </Container>
  );
}
