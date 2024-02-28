import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success("Booking successfully deleted");
      void queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return { isDeleting, deleteBooking };
}
