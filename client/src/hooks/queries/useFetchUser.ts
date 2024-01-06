import { useQuery } from "react-query";
import { FETCH_USER } from "../../api/urls";
import useFetchData from "../useFetchData";
import { User } from "../../types/User";

export default function useFetchUser(username: string | undefined) {
      const fetchData = useFetchData()
    const { data } = useQuery(
        `userQuery/${username}`,
        async () => {
            const result = await fetchData(`${FETCH_USER}/${username}`);
            return result as User ;
        }
    )
    return { data }
}