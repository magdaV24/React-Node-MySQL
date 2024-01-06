import { useQuery } from "react-query";
import useFetchData from "../useFetchData";
import { FETCH_USERNAME } from "../../api/urls";

export default function useFetchUsername(id: number | undefined) {
  const fetchData = useFetchData();
  const { data: username } = useQuery(`usernameQuery/${id}`, async () => {
    const result = await fetchData(`${FETCH_USERNAME}/${id}`);
    return result;
  });

  return { username };
}
