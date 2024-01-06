import { useQuery } from "react-query";
import { useAuthContext } from "../useAuthContext";
import { useEffect } from "react";
import useFetchData from "../useFetchData";
import { Entry } from "../../types/Entry";
import { FETCH_USER_PUBLIC_ENTRIES } from "../../api/urls";

export default function useFetchUserPublicEntries(id: number | undefined) {
  const authContext = useAuthContext();
  const fetchData = useFetchData()
  
  const {
    data: userPublicEntries,
    isLoading,
    error: userPublicEntriesError,
  } = useQuery(
    `userPublicEntries/${id}`,
    async () => {
      const result = await fetchData(`${FETCH_USER_PUBLIC_ENTRIES}/${id}`);
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

  return { userPublicEntries, userPublicEntriesError };
}
