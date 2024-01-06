import { useMutation } from "react-query";
import { LOGIN } from "../../api/urls";
import { useAuthContext } from "../useAuthContext";
import { useSaveToken } from "../useSaveToken";
import usePostData from "../usePostData";

const useLoginMutation = () => {
  const authContext = useAuthContext();
  const saveToken = useSaveToken();
  const postData = usePostData();
  const mutation = useMutation(
    async (input: unknown) => await postData(LOGIN, input),
    {
      onSuccess: (res) => {
        authContext.setUser(res);
        authContext.setMessage("Logged in successfully!");
        saveToken(res.token);
      },
      onError: () => {
        authContext.setUser(null);
        authContext.setToken(null);
      },
    }
  );
  const loginLoading = mutation.isLoading;
  return { mutation, loginLoading };
};


export default function useLogin() {
  const { mutation, loginLoading } = useLoginMutation();

  const login = async (input: unknown) => {
    try {
      await mutation.mutateAsync(input);
    } catch (error) {
      console.log(`Error on useLogin: ${error}`);
    }
  };
  return { login, loginLoading };
}
