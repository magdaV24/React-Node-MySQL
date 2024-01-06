import { useMutation } from "react-query";
import { SUBMIT_ART_WORK } from "../../api/urls";
import { useAuthContext } from "../useAuthContext";
import usePostData from "../usePostData";

const useAddEntryMutation = () => {
  const postData = usePostData();
  const authContext = useAuthContext();
  const mutation = useMutation(
    async (input: unknown) => await postData(SUBMIT_ART_WORK, input),
    {
      onSuccess: (data) => {
        if (data) {
          authContext.setOpenMessage(true);
          authContext.setMessage(data);
        }
      },
    }
  );
  const entryLoading = mutation.isLoading;
  return { mutation, entryLoading };
};

export default function useAddEntry() {
  const { mutation, entryLoading } = useAddEntryMutation();
  const add_entry = async (input: unknown) => {
    try {
      await mutation.mutateAsync(input);
    } catch (error) {
      console.log(`Error on useAddEntry: ${error}`);
    }
  };
  return { add_entry, entryLoading };
}