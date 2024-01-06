import { useMutation } from "react-query";
import { EDIT_FIELDS } from "../../api/urls";
import { useAuthContext } from "../useAuthContext";
import usePostDataWithToken from "../usePostDataWithToken";

const useEditFieldsMutation = (id: number) => {
  const postData = usePostDataWithToken();
  const authContext = useAuthContext();
  const mutation = useMutation(
    async (input: unknown) => await postData(`${EDIT_FIELDS}/${id}`, input),
    {
      onSuccess: (data) => {
        authContext.setMessage(data);
      },
    }
  );
  const editFieldsLoading = mutation.isLoading;
  return { mutation, editFieldsLoading };
};

export default function useEditFields(id: number) {
  const { mutation, editFieldsLoading } = useEditFieldsMutation(id);

  const edit_fields = async (input: unknown) => {
    try {
      await mutation.mutateAsync(input);
    } catch (error) {
      console.log(`Error on useEditFields: ${error}`)
    }
  };
  return { edit_fields, editFieldsLoading };
}
