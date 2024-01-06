import { useQuery } from "react-query";
import { useAuthContext } from "../useAuthContext";
import { FETCH_ENTRY } from "../../api/urls";
import { useEffect } from "react";
import { Entry } from "../../types/Entry";
import useFetchData from "../useFetchData";

export default function useFetchEntry(id: number) {
  const authContext = useAuthContext();
  const fetchData = useFetchData()
  const {
    data: entry,
    isLoading,
    error,
  } = useQuery(
    `entryQuery/${id}`,
    async () => {
      const result: Entry = await fetchData(`${FETCH_ENTRY}/${id}`);
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
    if(error){
      authContext.setError(error as string)
    }
  }, [isLoading, authContext, error]);

  return { entry };
}
