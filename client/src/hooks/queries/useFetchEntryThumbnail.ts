import { useEffect } from "react";
import { useQuery } from "react-query";
import { FETCH_ENTRY_THUMBNAIL } from "../../api/urls";
import useFetchData from "../useFetchData";
import { useAuthContext } from "../useAuthContext";

export default function useFetchEntryThumbnail(){
    const authContext = useAuthContext();
    const fetchData = useFetchData()
    const {
      data: publicEntries,
      isLoading,
      error: publicEntriesError,
    } = useQuery(
      "publicEntriesQuery",
      async () => {
        const result = await fetchData(FETCH_ENTRY_THUMBNAIL);
        return result;
      },
      {
        onSettled: () => {
          setTimeout(() => (authContext.setOpenBackdrop(false), 0));
        },
      }
    );
  
    useEffect(() => {
      if (isLoading) {
        authContext.setOpenBackdrop(true);
      }
    }, [isLoading, authContext]);
  
    return { publicEntries, publicEntriesError };
  }