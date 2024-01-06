import axios from "axios";

export default function useDeleteData() {
  const deleteData = async (url: string) => {
    try {
      const response = await axios.delete(url);
      return response.data;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  };
  return deleteData;
}
