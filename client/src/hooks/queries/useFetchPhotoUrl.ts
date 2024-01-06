import { useQuery } from "react-query";
import { FETCH_ENTRY_THUMBNAIL } from "../../api/urls";
import useFetchData from "../useFetchData";

export default function useFetchPhotoUrl(uuid: string) {
  const fetchData = useFetchData()
    const { data: url, isLoading: urlLoading, error: urlError } = useQuery(
        `urlQuery/${uuid}`,
        async () => {
            const result = await fetchData(`${FETCH_ENTRY_THUMBNAIL}/${uuid}`);
            return result ;
        }
    )
    return {url, urlLoading, urlError}
}
