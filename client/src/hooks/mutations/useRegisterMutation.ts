import { useMutation } from "react-query";
import { REGISTER } from "../../api/urls";
import { useAuthContext } from "../useAuthContext";
import { useSaveToken } from "../useSaveToken";
import usePostData from "../usePostData";

const useRegistrationMutation = () => {
  const postData = usePostData();
  const authContext = useAuthContext();
  const saveToken = useSaveToken()
  const mutation = useMutation(
    async (input: unknown) => await postData(REGISTER, input),
    {
      onSuccess: (data) => {
        authContext.setMessage("You registered successfully!")
        authContext.setUser(data)
        saveToken(data.token);
      },
      onError: () => {
        authContext.setUser(null)
        authContext.setToken(null)
      },
    }
  );

  const registrationLoading = mutation.isLoading;
  return { mutation, registrationLoading };
};

export default function useRegister() {
  const { mutation, registrationLoading } = useRegistrationMutation();

  const register = async (input: unknown) => {
    try {
      await mutation.mutateAsync(input);
    } catch (error) {
      console.log(`Error on useRegister: ${error}`)
    }
  };
  return { register, registrationLoading };
}
