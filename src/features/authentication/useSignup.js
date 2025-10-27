import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isPending: isSigningUp } = useMutation({
    mutationFn: signupApi,
    onSuccess: () =>
      toast.success(
        "Account created! Please verify it via the email sent to the provided email address"
      ),
    onError: (err) =>
      toast.error(err.message || "Registration failed. Something went wrong!"),
  });

  return { signup, isSigningUp };
}
