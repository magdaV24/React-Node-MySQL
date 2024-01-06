import axios, { AxiosError } from "axios";
import { useAuthContext } from "./useAuthContext";

export default function useDeleteData() {
  const authContext = useAuthContext()
  const deleteData = async (url: string) => {
    const token = authContext.token?.token;
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          };
        if(!token){
            authContext.setError("User not authenticated!");
        }
    try {
      const response = await axios.delete(url, { headers: headers});
      return response.data;
    } catch (error) {
      const errorMessage = (error as AxiosError).response?.data;
      authContext.setOpenError(true);
      authContext.setError(`Error: ${errorMessage}`);
    }
  };
  return deleteData;
}
