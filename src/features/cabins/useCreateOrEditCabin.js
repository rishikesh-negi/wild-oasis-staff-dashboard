import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateOrEditCabin(isEditSession) {
  const queryClient = useQueryClient();

  const { mutate: createOrEditCabin, isPending: isBusy } = useMutation({
    mutationFn: isEditSession
      ? ({ newCabinData, id }) => createEditCabin(newCabinData, id)
      : (newCabinData) => createEditCabin(newCabinData),
    onSuccess() {
      toast.success(
        isEditSession
          ? "Cabin successfully edited!"
          : "Cabin successfully created!"
      );

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError(err) {
      toast.error(err.message);
    },
  });

  return { createOrEditCabin, isBusy };
}
