import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings.ts";
import { useParams } from "react-router-dom";

export function useBooking() {
  const { bookingId } = useParams();
  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking"],
    queryFn: () => getBooking(Number(bookingId)),
    retry: false,
  });

  return { isLoading, booking, error };
}
