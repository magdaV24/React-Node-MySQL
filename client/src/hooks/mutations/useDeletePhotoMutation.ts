import { useMutation } from "react-query"
import { DELETE_PHOTO } from "../../api/urls"
import useDeleteData from "../useDeleteData"

const useDeletePhotoMutation = () => {
  const deleteData = useDeleteData()
    const mutation = useMutation(async (id: number) => {
        await deleteData(`${DELETE_PHOTO}/${id}`)
    })
    const deletePhotoLoading = mutation.isLoading;
    return {mutation, deletePhotoLoading};
}

export default function useDeletePhoto() {
    const {mutation, deletePhotoLoading} = useDeletePhotoMutation();
    const deletePhoto = async (input: number) => {
        try {
        await  mutation.mutateAsync(input);
        } catch (error) {
          console.log(`Error on useDeletePhoto: ${error}`)
        }
      };
      return {deletePhoto, deletePhotoLoading};

}
