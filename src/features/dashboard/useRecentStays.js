import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
  const [searchParams] = useSearchParams();

  const numDays = Number.parseInt(searchParams.get("last")) || 7;
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { data: stays, isLoading: isLoadingStays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", `last-${numDays}`],
  });

  const confirmedStays = stays?.filter((stay) =>
    ["checked-in", "checked-out"].includes(stay.status)
  );

  return { stays, confirmedStays, isLoadingStays, numDays };
}
