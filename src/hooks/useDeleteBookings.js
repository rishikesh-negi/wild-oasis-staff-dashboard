import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: deleteBooking, isPending: isDeletingBooking } = useMutation({
    mutationFn: (bookingId) => deleteBookingApi(bookingId),
    onSuccess(data) {
      toast.success(`Booking #${data.id} successfully deleted!`);

      queryClient.invalidateQueries({
        queryKey: ["bookings", "booking"],
      });
    },
    onError(err) {
      toast.error(`Uh oh! Booking could not be deleted`);
      console.error(err);
    },
  });

  return { deleteBooking, isDeletingBooking };
}
