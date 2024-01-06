import { useMutation } from "react-query";
import { ADD_PHOTO } from "../../api/urls";
import usePostData from "../usePostData";
import { useAuthContext } from "../useAuthContext";

const useAddPhotoMutation = () => {
  const postData = usePostData();
  const authContext = useAuthContext();
  const mutation = useMutation(
    async (input: unknown) => await postData(ADD_PHOTO, input), 
    {
      onSuccess: (data) => {
        authContext.setMessage(data)
      }
    }
  );
  return mutation;
};

export default function useAddPhoto() {
  const mutation = useAddPhotoMutation();
  const add_photo = async (input: unknown) => {
    try {
      await mutation.mutateAsync(input);
    } catch (error) {
      console.log(`Error on useAddPhoto: ${error}`)
    }
  };
  return add_photo;
}