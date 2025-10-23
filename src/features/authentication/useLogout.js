import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: logoutApi,
    onSuccess() {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
    onError(err) {
      console.error(err);
      toast.error("Failed to log out. Something went wrong! Please try again.");
    },
  });

  return { logout, isLoggingOut };
}
