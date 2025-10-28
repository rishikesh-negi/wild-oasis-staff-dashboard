import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  // 1. Number of bookings:
  const numBookings = bookings.length;

  // 2. Total Sales:
  const sales = bookings?.reduce((accum, curr) => accum + curr.totalPrice, 0);

  // 3. Total Check-ins:
  const checkIns = confirmedStays.length;

  // 4. Occupancy Rate:
  const occupancyRate =
    confirmedStays?.reduce((accum, curr) => accum + curr.numNights, 0) /
    (numDays * cabinCount);

  console.log(confirmedStays);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />

      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />

      <Stat
        title="Check-ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkIns}
      />

      <Stat
        title="Occupancy Rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={`${Math.round(occupancyRate * 100)}%`}
      />
    </>
  );
}

export default Stats;
