import { useQuery } from "react-query";
import { useAuthContext } from "../useAuthContext";
import { FETCH_IF_PUBLIC } from "../../api/urls";
import { useEffect } from "react";
import { Entry } from "../../types/Entry";
import useFetchData from "../useFetchData";

export default function useFetchPublicEntries() {
  const authContext = useAuthContext();
  const fetchData = useFetchData()
  const {
    data: publicEntries,
    isLoading,
    error: publicEntriesError,
  } = useQuery(
    "publicEntriesQuery",
    async () => {
      const result = await fetchData(FETCH_IF_PUBLIC);
      return result as Entry[];
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
