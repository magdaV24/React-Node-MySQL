import { useQuery } from "react-query";
import { FETCH_ENTRY_THUMBNAIL } from "../../api/urls";
import useFetchData from "../useFetchData";
import { useEffect } from "react";
import { useAuthContext } from "../useAuthContext";

export default function useFetchPhotoUrl(uuid: string) {
  const fetchData = useFetchData();
  const authContext = useAuthContext();
  const {
    data: url,
    isLoading,
    error,
  } = useQuery(`urlQuery/${uuid}`, async () => {
    const result = await fetchData(`${FETCH_ENTRY_THUMBNAIL}/${uuid}`);
    return result;
  });
  useEffect(() => {
    if (isLoading) {
      authContext.setOpenBackdrop(true);
    }
    if (error) {
      authContext.setError(error as string);
    }
  }, [isLoading, authContext, error]);
  return { url };
}
