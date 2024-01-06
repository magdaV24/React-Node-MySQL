import { useMutation } from "react-query";
import { DELETE_ENTRY } from "../../api/urls";
import useDeleteData from "../useDeleteData";
import { useAuthContext } from "../useAuthContext";

const useDeleteEntryMutation = () => {
  const deleteData = useDeleteData();
  const authContext = useAuthContext();
  const mutation = useMutation(async (uuid: string) => {
    await deleteData(`${DELETE_ENTRY}/${uuid}`),
      {
        onSuccess: (data: string) => {
          authContext.setMessage(data);
        },
      };
  });
  const deleteEntryLoading = mutation.isLoading;
  return { mutation, deleteEntryLoading };
};

export default function useDeleteEntry() {
  const { mutation, deleteEntryLoading } = useDeleteEntryMutation();
  const deleteEntry = async (input: string) => {
    try {
      await mutation.mutateAsync(input);
    } catch (error) {
      console.log(`Error on useDeleteEntry: ${error}`);
    }
  };
  return { deleteEntry, deleteEntryLoading };
}
