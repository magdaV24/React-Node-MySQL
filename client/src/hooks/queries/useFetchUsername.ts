import { useQuery } from "react-query";
import useFetchData from "../useFetchData";
import { FETCH_USERNAME } from "../../api/urls";
import { useEffect } from "react";
import { useAuthContext } from "../useAuthContext";

export default function useFetchUsername(id: number | undefined) {
  const fetchData = useFetchData();
  const authContext = useAuthContext()
  const { data: username, error, isLoading } = useQuery(`usernameQuery/${id}`, async () => {
    const result = await fetchData(`${FETCH_USERNAME}/${id}`);
    return result;
  });

  useEffect(() => {
    if (isLoading) {
      authContext.setOpenBackdrop(true);
    }
    if(error){
      authContext.setError(error as string)
    }
  }, [isLoading, authContext, error]);
  return { username };
}
