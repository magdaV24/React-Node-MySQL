import { useQuery } from "react-query";
import { useAuthContext } from "../useAuthContext";
import { useEffect } from "react";
import useFetchData from "../useFetchData";
import { Entry } from "../../types/Entry";
import { FETCH_USER_ENTRIES } from "../../api/urls";

export default function useFetchUserEntries(id: number | undefined) {
  const authContext = useAuthContext();
  const fetchData = useFetchData()
  const {
    data: userEntries,
    isLoading,
    error,
  } = useQuery(
    `userEntries/${id}`,
    async () => {
      const result = await fetchData(`${FETCH_USER_ENTRIES}/${id}`);
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
    if(error){
      authContext.setError(error as string)
    }
  }, [isLoading, authContext, error]);

  return { userEntries };
}
