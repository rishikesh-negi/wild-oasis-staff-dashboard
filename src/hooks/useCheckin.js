import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    mutationFn({ bookingId, breakfast }) {
      return updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      });
    },
    onSuccess(data) {
      toast.success(`Check-in for booking #${data.id} confirmed`);
      queryClient.invalidateQueries({ active: true });
      navigate("/", {
        replace: true,
      });
    },
    onError(err) {
      toast.error("An error occured while checking in");
      console.error(err);
    },
  });

  return { checkin, isCheckingIn };
}
