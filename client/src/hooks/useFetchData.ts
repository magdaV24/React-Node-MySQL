import axios from "axios";

export default function useFetchData() {
  const fetchData = async (url: string) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error: unknown) {
      throw new Error(`Error fetching data: ${error}`);
    }
  };
  return fetchData;
}