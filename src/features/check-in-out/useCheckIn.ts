import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({
      bookingId,
      breakfast,
    }: {
      bookingId: number;
      breakfast?: {
        hasBreakfast: boolean;
        extrasPrice: number;
        totalPrice: number;
      };
    }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: () => {
      toast.success(`Booking successfully checked in`);
      void queryClient.invalidateQueries({ queryKey: ["booking"] });
      navigate("/");
    },
    onError: () => {
      toast.error("There was an error checking in");
    },
  });

  return { checkin, isCheckingIn };
}
