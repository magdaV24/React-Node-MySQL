import { useQuery } from "react-query";
import { FETCH_USER } from "../../api/urls";
import useFetchData from "../useFetchData";
import { User } from "../../types/User";
import { useEffect } from "react";
import { useAuthContext } from "../useAuthContext";

export default function useFetchUser(username: string | undefined) {
      const fetchData = useFetchData()
      const authContext = useAuthContext()
    const { data, error, isLoading } = useQuery(
        `userQuery/${username}`,
        async () => {
            const result = await fetchData(`${FETCH_USER}/${username}`);
            return result as User ;
        }
    )
    useEffect(() => {
        if (isLoading) {
          authContext.setOpenBackdrop(true);
        }
        if(error){
          authContext.setError(error as string)
        }
      }, [isLoading, authContext, error]);
    return { data }
}