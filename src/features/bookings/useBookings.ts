import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";

export function useBookings() {
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({ queryKey: ["bookins"], queryFn: getBookings });

  return { isLoading, bookings, error };
}
