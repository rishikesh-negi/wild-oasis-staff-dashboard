import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: isUpdatingUser } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess() {
      toast.success("Account successfully updated!");
      // Manually updating the cache if query invalidation isn't working for some reason (The user object should be received as argument by the onSuccess handler):
      // queryClient.setQueryData(["user"], user);

      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError(err) {
      toast.error(err.message);
    },
  });

  return { updateUser, isUpdatingUser };
}
