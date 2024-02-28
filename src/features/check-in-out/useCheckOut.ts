import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckOut() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId: number) =>
      updateBooking(bookingId, { status: "checked-out" }),
    onSuccess: () => {
      toast.success(`Booking successfully checked out`);
      void queryClient.invalidateQueries({ queryKey: ["booking"] });
    },
    onError: () => {
      toast.error("There was an error checking out");
    },
  });

  return { checkout, isCheckingOut };
}
