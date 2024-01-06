import { useEffect } from "react";
import { useQuery } from "react-query";
import { FETCH_ENTRY_PHOTOS } from "../../api/urls";
import { useAuthContext } from "../useAuthContext";
import { Photo } from "../../types/Photo";
import useFetchData from "../useFetchData";

export default function useFetchEntryPhotos(uuid: string) {
  const authContext = useAuthContext();
  const fetchData = useFetchData();

  const {
    data: entryPhotos,
    isLoading,
    error: entryPhotosError,
  } = useQuery(
    `entryPhotosQuery/${uuid}`,
    async () => {
      const result: Photo[] = await fetchData(`${FETCH_ENTRY_PHOTOS}/${uuid}`);
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

  return { entryPhotos, entryPhotosError };
}
